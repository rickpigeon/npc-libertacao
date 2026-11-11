/**
 * NPC Libertação: resident editor (GM). Likes and dislikes are one per line; what was already
 * revealed stays revealed when the text of that line is kept.
 */
import { MODULE_ID, MODULE_TITLE, TEMPLATES, colorFor, initials } from "./constants.mjs";
import { LOCAIS, TIERS } from "./data.mjs";
import { TIER_KEYS, getNpc, getNpcs, normalizeNpc, saveNpcs } from "./store.mjs";
import { guardActions } from "./errors.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

function readForm(form) {
  const out = {};
  for ( const el of form.querySelectorAll("[name]") ) out[el.getAttribute("name")] = el.type === "checkbox" ? el.checked : el.value;
  return out;
}

/** Lines of a textarea -> items, keeping the "revealed" flag of lines that did not change. */
function mergeLines(textValue, previous) {
  const old = new Map(previous.map(x => [x.t.trim().toLowerCase(), x.rev]));
  return String(textValue ?? "").split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    .map(t => ({ t, rev: old.get(t.toLowerCase()) ?? false }));
}

export class NpcEditor extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.draft = normalizeNpc(options.npc ?? {});
    this.isNew = !!options.isNew;
  }

  static DEFAULT_OPTIONS = {
    classes: ["npc-libertacao", "nl-editor-app"],
    tag: "form",
    window: { icon: "fa-solid fa-user-pen", resizable: true },
    position: { width: 640, height: 780 },
    form: { handler: NpcEditor.#onSubmit, submitOnChange: false, closeOnSubmit: true },
    actions: guardActions({ browse: NpcEditor.#onBrowse })
  };

  static PARTS = {
    form: { template: `${TEMPLATES}/editor.hbs`, scrollable: [".nl-scroll"] }
  };

  static open(id) {
    if ( !game.user.isGM ) return null;
    const npc = id ? getNpc(id) : normalizeNpc({ nome: "Novo morador", book: false });
    if ( !npc ) {
      ui.notifications.warn(`${MODULE_TITLE}: morador não encontrado.`);
      return null;
    }
    const appId = `${MODULE_ID}-editor-${npc.id}`;
    const existing = foundry.applications.instances.get(appId);
    if ( existing ) {
      existing.bringToFront?.();
      return existing;
    }
    const app = new NpcEditor({ id: appId, npc, isNew: !id });
    app.render({ force: true });
    return app;
  }

  get title() {
    return this.isNew ? "Novo morador" : `Editar: ${this.draft.nome}`;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const n = this.draft;
    Object.assign(context, {
      n,
      initials: initials(n.nome),
      color: colorFor(n.nome),
      locais: LOCAIS,
      gostosText: n.gostos.map(x => x.t).join("\n"),
      desgostosText: n.desgostos.map(x => x.t).join("\n"),
      tiers: TIER_KEYS.map(k => ({ key: k, label: TIERS[k].label, range: TIERS[k].range, t: n[k].t }))
    });
    return context;
  }

  #form() {
    return this.element.tagName === "FORM" ? this.element : this.element.querySelector("form");
  }

  static async #onBrowse() {
    const input = this.#form().querySelector("input[name=img]");
    const FP = foundry.applications.apps.FilePicker.implementation;
    const picker = new FP({
      type: "image",
      current: input.value || "",
      callback: path => {
        input.value = path;
        const prev = this.element.querySelector(".nl-ed-portrait");
        if ( prev ) prev.innerHTML = `<img src="${path}" alt="">`;
      }
    });
    picker.render({ force: true });
  }

  static async #onSubmit(event, form) {
    const v = readForm(form);
    const d = this.draft;
    const npc = normalizeNpc({
      ...d,
      nome: v.nome,
      img: v.img,
      local: v.local,
      pagina: v.pagina,
      descricao: v.descricao,
      gostos: mergeLines(v.gostos, d.gostos),
      desgostos: mergeLines(v.desgostos, d.desgostos),
      demanda: { t: v.demanda, rev: d.demanda.rev },
      notas: v.notas,
      oculto: !!v.oculto,
      ...Object.fromEntries(TIER_KEYS.map(k => [k, { t: v[k], rev: d[k].rev }]))
    });
    const list = getNpcs();
    const i = list.findIndex(n => n.id === npc.id);
    if ( i >= 0 ) list[i] = npc;
    else list.push(npc);
    await saveNpcs(list);
    const { NpcApp } = await import("./npc-app.mjs");
    NpcApp.open({ focus: npc.id });
  }
}
