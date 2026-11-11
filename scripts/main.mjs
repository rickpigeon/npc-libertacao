/**
 * NPC Libertação: entry point.
 *
 * Opening the list (everybody): the "NPCs de Candeh'ssa" button in the Token controls,
 * a keybinding (unassigned by default) or `game.modules.get("npc-libertacao").api.open()`.
 * The GM can also open it on every screen at once ("Mostrar a todos").
 */
import { MODULE_ID, MODULE_TITLE } from "./constants.mjs";
import { getAffinity, getNpcs, getPlayers, registerSettings } from "./store.mjs";
import { NpcApp } from "./npc-app.mjs";
import { listenSocket, showToAll } from "./broadcast.mjs";
import { watchUncaught } from "./errors.mjs";

/* Several settings can change in one save: redraw the open windows once. */
let refreshTimer = null;
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => NpcApp.refresh(), 40);
}

Hooks.once("init", () => {
  watchUncaught();
  registerSettings(scheduleRefresh);
  game.keybindings.register(MODULE_ID, "abrir", {
    name: `Abrir ${MODULE_TITLE}`,
    editable: [],
    restricted: false,
    onDown: () => {
      NpcApp.open();
      return true;
    }
  });
});

Hooks.once("ready", () => {
  listenSocket();
  const module = game.modules.get(MODULE_ID);
  if ( module ) {
    module.api = {
      /** Open the list on this screen (anyone). `focus`: a resident id to select. */
      open: (focus = null) => NpcApp.open({ focus }),
      /** Open the list on every screen (GM). */
      show: (focus = null) => showToAll(focus),
      /** Copies of every resident (GM data included: use it only as GM). */
      npcs: () => getNpcs(),
      /** Copies of the tracked player characters. */
      players: () => getPlayers(),
      /** Copy of the affinity map { npcId: { playerId: { pa, ud, ativo } } }. */
      affinity: () => getAffinity()
    };
  }
});

/* Redraw when the stored data or the options change (every client). */
function onSettingChanged(setting) {
  if ( String(setting?.key ?? "").startsWith(`${MODULE_ID}.`) ) scheduleRefresh();
}
Hooks.on("createSetting", onSettingChanged);
Hooks.on("updateSetting", onSettingChanged);

/* v13: controls is a record of controls, each with a record of tools. Visible to everybody. */
Hooks.on("getSceneControlButtons", controls => {
  const tokens = controls?.tokens;
  if ( !tokens?.tools ) return;
  tokens.tools.npcLibertacao = {
    name: "npcLibertacao",
    title: MODULE_TITLE,
    icon: "fa-solid fa-users",
    order: Object.keys(tokens.tools).length,
    button: true,
    visible: true,
    onChange: () => NpcApp.open()
  };
});
