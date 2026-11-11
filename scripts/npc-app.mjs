/**
 * NPC Libertação: the residents window (everybody).
 * Players see the residents the GM shows, with name, picture, place and description, plus only the
 * likes, dislikes, Última Demanda and benefits the GM revealed, and the Affinity Points.
 * The GM sees everything, reveals item by item, hides whole residents and keeps the points.
 */
import { MODULE_ID, MODULE_TITLE, TEMPLATES, colorFor, escapeHTML, fold, initials } from "./constants.mjs";
import { PA_MAX, TIERS } from "./data.mjs";
import {
  TIER_KEYS, affinityOf, bookEntry, dropAffinity, fromBook, getAffinity, getNpc, getNpcs, getPlayers, saveNpcs, setAffinity, setting, tierOf,
  updateNpc
} from "./store.mjs";
import { announcePa, announceReveal } from "./chat.mjs";
import { guardActions, reportError } from "./errors.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const APP_ID = `${MODULE_ID}-lista`;

export class NpcApp extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.ui = { selected: options.focus ?? null, q: "", local: "", playerView: false };
  }

  static DEFAULT_OPTIONS = {
    id: APP_ID,
    classes: ["npc-libertacao", "nl-app"],
    window: { title: "NPCs de Candeh'ssa", icon: "fa-solid fa-users", resizable: true },
    position: { width: 1120, height: 780 },
    actions: guardActions({
      select: NpcApp.#onSelect,
      toggleItem: NpcApp.#onToggleItem,
      toggleField: NpcApp.#onToggleField,
      revealAll: NpcApp.#onRevealAll,
      hideAll: NpcApp.#onHideAll,
      toggleHidden: NpcApp.#onToggleHidden,
      paUp: NpcApp.#onPaUp,
      paDown: NpcApp.#onPaDown,
      toggleUd: NpcApp.#onToggleUd,
      toggleAtivo: NpcApp.#onToggleAtivo,
      edit: NpcApp.#onEdit,
      newNpc: NpcApp.#onNewNpc,
      remove: NpcApp.#onRemove,
      restore: NpcApp.#onRestore,
      players: NpcApp.#onPlayers,
      showAll: NpcApp.#onShowAll,
      playerView: NpcApp.#onPlayerView,
      pickImage: NpcApp.#onPickImage
    })
  };

  static PARTS = {
    main: { template: `${TEMPLATES}/lista.hbs` }
  };

  static open({ focus = null } = {}) {
    const existing = foundry.applications.instances.get(APP_ID);
    if ( existing ) {
      if ( focus ) existing.ui.selected = focus;
      existing.render({ force: true });
      existing.bringToFront?.();
      return existing;
    }
    const app = new NpcApp({ focus });
    app.render({ force: true });
    return app;
  }

  static refresh() {
    const app = foundry.applications.instances.get(APP_ID);
    if ( app?.rendered ) app.render();
  }

  get asPlayer() {
    return !game.user.isGM || this.ui.playerView;
  }

  /** Players the current viewer may see the points of. */
  #visiblePlayers(players) {
    /* the GM's "see as players" preview keeps every row: each player would see their own */
    if ( game.user.isGM || setting("verTodos", true) ) return players;
    return players.filter(p => p.userId && p.userId === game.user.id);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const gm = game.user.isGM;
    const asPlayer = this.asPlayer;
    const all = getNpcs();
    const npcs = asPlayer ? all.filter(n => !n.oculto) : all;
    const affinity = getAffinity();
    const players = getPlayers();
    const shownPlayers = this.#visiblePlayers(players);
    const mine = players.filter(p => p.userId === game.user.id);
    if ( !npcs.some(n => n.id === this.ui.selected) ) this.ui.selected = npcs[0]?.id ?? null;

    const cards = npcs.map(n => {
      const myTier = mine.map(p => tierOf(affinityOf(affinity, n.id, p.id).pa, affinityOf(affinity, n.id, p.id).ud)).find(Boolean) ?? "";
      const ativo = mine.some(p => affinityOf(affinity, n.id, p.id).ativo);
      return {
        id: n.id,
        nome: n.nome,
        local: n.local,
        img: n.img,
        initials: initials(n.nome),
        color: colorFor(n.nome),
        oculto: n.oculto,
        selected: n.id === this.ui.selected,
        search: fold(`${n.nome} ${n.local}`),
        myTier: myTier ? TIERS[myTier].label : "",
        ativo
      };
    });
    const locais = [...new Set(npcs.map(n => n.local).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    const sel = npcs.find(n => n.id === this.ui.selected) ?? null;

    Object.assign(context, {
      gm,
      asPlayer,
      playerView: this.ui.playerView,
      cards,
      hasCards: cards.length > 0,
      count: cards.length,
      hiddenCount: all.filter(n => n.oculto).length,
      locais: locais.map(l => ({ value: l, selected: l === this.ui.local })),
      q: this.ui.q,
      detail: sel ? this.#detail(sel, affinity, shownPlayers, asPlayer) : null,
      noPlayers: players.length === 0
    });
    return context;
  }

  #detail(n, affinity, players, asPlayer) {
    const items = (arr, kind) => {
      const shown = arr.map((x, i) => ({ ...x, i, kind })).filter(x => !asPlayer || x.rev);
      return { list: shown, unknown: asPlayer ? arr.filter(x => !x.rev).length : 0, total: arr.length };
    };
    const tiers = TIER_KEYS.map(k => ({
      key: k,
      label: TIERS[k].label,
      range: TIERS[k].range,
      t: !asPlayer || n[k].rev ? n[k].t : "",
      rev: n[k].rev,
      empty: !n[k].t
    }));
    const rows = players.map(p => {
      const a = affinityOf(affinity, n.id, p.id);
      const tier = tierOf(a.pa, a.ud);
      return {
        id: p.id,
        name: p.name,
        pa: a.pa,
        ud: a.ud,
        ativo: a.ativo,
        tier: tier ? TIERS[tier].label : "—",
        tierKey: tier,
        pips: Array.from({ length: PA_MAX }, (_, k) => ({ on: k < a.pa })),
        canUp: a.pa < PA_MAX,
        canDown: a.pa > 0,
        waitingUd: a.pa >= PA_MAX && !a.ud
      };
    });
    const book = !!bookEntry(n.id) && n.book;
    return {
      ...n,
      initials: initials(n.nome),
      color: colorFor(n.nome),
      gostos: items(n.gostos, "gostos"),
      desgostos: items(n.desgostos, "desgostos"),
      demandaText: !asPlayer || n.demanda.rev ? n.demanda.t : "",
      demandaRev: n.demanda.rev,
      demandaEmpty: !n.demanda.t,
      tiers,
      rows,
      hasRows: rows.length > 0,
      book,
      showNotes: !asPlayer && !!n.notas
    };
  }

  async _onRender(context, options) {
    await super._onRender(context, options);
    const q = this.element.querySelector("input[name=q]");
    q?.addEventListener("input", () => {
      this.ui.q = q.value;
      this.#filter();
    });
    const local = this.element.querySelector("select[name=local]");
    local?.addEventListener("change", () => {
      this.ui.local = local.value;
      this.#filter();
    });
    this.#filter();
    /* drop an actor (or an image) on the portrait to use its picture */
    const portrait = this.element.querySelector(".nl-detail .nl-portrait");
    if ( portrait && game.user.isGM && !this.ui.playerView ) {
      portrait.addEventListener("dragover", e => e.preventDefault());
      portrait.addEventListener("drop", e => {
        e.preventDefault();
        this.#onDropPortrait(e).catch(err => reportError(err, "imagem"));
      });
    }
  }

  #filter() {
    const q = fold(this.ui.q).trim();
    const l = this.ui.local;
    let shown = 0;
    for ( const li of this.element.querySelectorAll(".nl-card") ) {
      const ok = (!q || li.dataset.search.includes(q)) && (!l || li.dataset.local === l);
      li.hidden = !ok;
      if ( ok ) shown++;
    }
    const none = this.element.querySelector(".nl-nomatch");
    if ( none ) none.hidden = shown > 0;
  }

  async #onDropPortrait(event) {
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    let img = "";
    if ( data?.uuid ) {
      const doc = await fromUuid(data.uuid);
      img = doc?.img ?? doc?.src ?? doc?.texture?.src ?? "";
    }
    if ( !img && data?.src ) img = data.src;
    if ( !img ) {
      ui.notifications.warn(`${MODULE_TITLE}: solte aqui um ator (ou use o botão de imagem).`);
      return;
    }
    await updateNpc(this.ui.selected, n => {
      n.img = img;
    });
  }

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  static #gm() {
    if ( !game.user.isGM ) throw new Error("Só o mestre faz isso.");
  }

  static async #onSelect(event, target) {
    this.ui.selected = target.closest("[data-npc-id]")?.dataset.npcId ?? this.ui.selected;
    this.render();
  }

  /** Reveal or hide one like / dislike. */
  static async #onToggleItem(event, target) {
    NpcApp.#gm();
    const kind = target.dataset.kind;
    const i = Number(target.dataset.index);
    let revealed = null;
    const npc = await updateNpc(this.ui.selected, n => {
      const it = n[kind]?.[i];
      if ( !it ) return;
      it.rev = !it.rev;
      if ( it.rev ) revealed = it.t;
    });
    if ( revealed ) await announceReveal(npc, kind === "gostos" ? "gosto" : "desgosto", revealed);
  }

  /** Reveal or hide the Última Demanda or one benefit tier. */
  static async #onToggleField(event, target) {
    NpcApp.#gm();
    const field = target.dataset.field;
    let revealed = null;
    const npc = await updateNpc(this.ui.selected, n => {
      if ( !n[field] ) return;
      n[field].rev = !n[field].rev;
      if ( n[field].rev ) revealed = n[field].t;
    });
    if ( revealed ) await announceReveal(npc, field, revealed);
  }

  static async #onRevealAll() {
    NpcApp.#gm();
    await updateNpc(this.ui.selected, n => {
      for ( const it of [...n.gostos, ...n.desgostos] ) it.rev = true;
      n.demanda.rev = true;
      for ( const k of TIER_KEYS ) n[k].rev = true;
    });
  }

  static async #onHideAll() {
    NpcApp.#gm();
    await updateNpc(this.ui.selected, n => {
      for ( const it of [...n.gostos, ...n.desgostos] ) it.rev = false;
      n.demanda.rev = false;
      for ( const k of TIER_KEYS ) n[k].rev = false;
    });
  }

  static async #onToggleHidden() {
    NpcApp.#gm();
    let shown = false;
    const npc = await updateNpc(this.ui.selected, n => {
      n.oculto = !n.oculto;
      shown = !n.oculto;
    });
    if ( shown ) await announceReveal(npc, "morador");
  }

  async #changePa(target, delta) {
    const pid = target.closest("[data-player-id]")?.dataset.playerId;
    const npc = getNpc(this.ui.selected);
    if ( !pid || !npc ) return;
    const cur = affinityOf(getAffinity(), npc.id, pid);
    const next = await setAffinity(npc.id, pid, { pa: cur.pa + delta });
    const player = getPlayers().find(p => p.id === pid);
    const tier = tierOf(next.pa, next.ud);
    if ( next.pa !== cur.pa ) await announcePa(npc, player?.name ?? "?", next.pa, tier ? TIERS[tier].label : "");
  }

  static async #onPaUp(event, target) {
    NpcApp.#gm();
    await this.#changePa(target, 1);
  }

  static async #onPaDown(event, target) {
    NpcApp.#gm();
    await this.#changePa(target, -1);
  }

  static async #onToggleUd(event, target) {
    NpcApp.#gm();
    const pid = target.closest("[data-player-id]")?.dataset.playerId;
    const cur = affinityOf(getAffinity(), this.ui.selected, pid);
    await setAffinity(this.ui.selected, pid, { ud: !cur.ud });
  }

  static async #onToggleAtivo(event, target) {
    NpcApp.#gm();
    const pid = target.closest("[data-player-id]")?.dataset.playerId;
    const cur = affinityOf(getAffinity(), this.ui.selected, pid);
    await setAffinity(this.ui.selected, pid, { ativo: !cur.ativo });
  }

  static async #onEdit() {
    NpcApp.#gm();
    const { NpcEditor } = await import("./npc-editor.mjs");
    NpcEditor.open(this.ui.selected);
  }

  static async #onNewNpc() {
    NpcApp.#gm();
    const { NpcEditor } = await import("./npc-editor.mjs");
    NpcEditor.open(null);
  }

  static async #onRemove() {
    NpcApp.#gm();
    const npc = getNpc(this.ui.selected);
    if ( !npc ) return;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Excluir morador" },
      content: `<p>Excluir <strong>${escapeHTML(npc.nome)}</strong> da lista? A afinidade com ele também some.</p>`,
      rejectClose: false,
      modal: true
    });
    if ( !ok ) return;
    this.ui.selected = null;
    await saveNpcs(getNpcs().filter(n => n.id !== npc.id));
    await dropAffinity(npc.id);
  }

  static async #onRestore() {
    NpcApp.#gm();
    const npc = getNpc(this.ui.selected);
    const b = npc ? bookEntry(npc.id) : null;
    if ( !b ) return;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Voltar ao livro" },
      content: `<p>Voltar <strong>${escapeHTML(npc.nome)}</strong> ao texto do livro? As suas edições e as revelações deste morador se perdem (a imagem e a afinidade ficam).</p>`,
      rejectClose: false,
      modal: true
    });
    if ( !ok ) return;
    await saveNpcs(getNpcs().map(n => (n.id === npc.id ? { ...fromBook(b), img: n.img, oculto: n.oculto } : n)));
  }

  static async #onPlayers() {
    NpcApp.#gm();
    const { PlayersApp } = await import("./players-app.mjs");
    PlayersApp.open();
  }

  static async #onShowAll() {
    NpcApp.#gm();
    const npc = getNpc(this.ui.selected);
    if ( npc?.oculto ) ui.notifications.warn(`${MODULE_TITLE}: ${npc.nome} está oculto; os jogadores abrem a lista sem ele.`);
    const { showToAll } = await import("./broadcast.mjs");
    showToAll(npc && !npc.oculto ? npc.id : null);
  }

  static async #onPlayerView() {
    NpcApp.#gm();
    this.ui.playerView = !this.ui.playerView;
    this.render();
  }

  static async #onPickImage() {
    NpcApp.#gm();
    const npc = getNpc(this.ui.selected);
    if ( !npc ) return;
    const FP = foundry.applications.apps.FilePicker.implementation;
    const picker = new FP({
      type: "image",
      current: npc.img || "",
      callback: path => {
        updateNpc(npc.id, n => {
          n.img = path;
        }).catch(err => reportError(err, "imagem"));
      }
    });
    picker.render({ force: true });
  }
}
