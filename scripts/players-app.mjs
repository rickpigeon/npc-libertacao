/**
 * NPC Libertação: the player characters the GM tracks affinity for. Linking a character to a
 * Foundry user lets the "only my own points" mode know whose row is whose.
 */
import { MODULE_ID, TEMPLATES } from "./constants.mjs";
import { getPlayers, savePlayers } from "./store.mjs";
import { guardActions } from "./errors.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const APP_ID = `${MODULE_ID}-jogadores`;

export class PlayersApp extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.rows = getPlayers();
  }

  static DEFAULT_OPTIONS = {
    id: APP_ID,
    classes: ["npc-libertacao", "nl-players-app"],
    tag: "form",
    window: { title: "Jogadores e personagens", icon: "fa-solid fa-user-group", resizable: true },
    position: { width: 520, height: "auto" },
    form: { handler: PlayersApp.#onSubmit, submitOnChange: false, closeOnSubmit: true },
    actions: guardActions({ add: PlayersApp.#onAdd, removeRow: PlayersApp.#onRemoveRow, importUsers: PlayersApp.#onImport })
  };

  static PARTS = {
    form: { template: `${TEMPLATES}/jogadores.hbs` }
  };

  static open() {
    if ( !game.user.isGM ) return null;
    const existing = foundry.applications.instances.get(APP_ID);
    if ( existing ) {
      existing.bringToFront?.();
      return existing;
    }
    const app = new PlayersApp();
    app.render({ force: true });
    return app;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const users = game.users.filter(u => !u.isGM).map(u => ({ id: u.id, name: u.name }));
    context.rows = this.rows.map((r, i) => ({ ...r, i, users: users.map(u => ({ ...u, selected: u.id === r.userId })) }));
    context.hasRows = this.rows.length > 0;
    return context;
  }

  #form() {
    return this.element.tagName === "FORM" ? this.element : this.element.querySelector("form");
  }

  /** Keep what was typed before re-rendering. */
  #collect() {
    const form = this.#form();
    this.rows = this.rows.map((r, i) => ({
      ...r,
      name: form.querySelector(`[name="name${i}"]`)?.value ?? r.name,
      userId: form.querySelector(`[name="user${i}"]`)?.value ?? r.userId
    }));
  }

  static async #onAdd() {
    this.#collect();
    this.rows.push({ id: foundry.utils.randomID(), name: "", userId: "" });
    this.render();
  }

  static async #onRemoveRow(event, target) {
    this.#collect();
    this.rows.splice(Number(target.dataset.index), 1);
    this.render();
  }

  static async #onImport() {
    this.#collect();
    for ( const u of game.users.filter(x => !x.isGM && x.character) ) {
      if ( this.rows.some(r => r.userId === u.id || r.name === u.character.name) ) continue;
      this.rows.push({ id: foundry.utils.randomID(), name: u.character.name, userId: u.id });
    }
    this.render();
  }

  static async #onSubmit() {
    this.#collect();
    await savePlayers(this.rows.map(r => ({ id: r.id, name: String(r.name ?? "").trim(), userId: r.userId || "" })).filter(r => r.name));
  }
}
