/**
 * NPC Libertação: "Mostrar a todos" opens the list (focused on one resident) on every screen.
 * Message on `module.npc-libertacao`: { type: "open", focus, from }. Only GM messages are obeyed.
 */
import { MODULE_TITLE, SOCKET } from "./constants.mjs";
import { reportError } from "./errors.mjs";
import { NpcApp } from "./npc-app.mjs";

export function showToAll(focus = null) {
  if ( !game.user.isGM ) return;
  game.socket.emit(SOCKET, { type: "open", focus, from: game.user.id });
  ui.notifications.info(`${MODULE_TITLE}: lista aberta para todos os jogadores.`);
}

export function listenSocket() {
  game.socket.on(SOCKET, data => {
    try {
      if ( data?.type !== "open" || !game.users.get(data.from)?.isGM ) return;
      NpcApp.open({ focus: typeof data.focus === "string" ? data.focus : null });
    } catch ( err ) {
      reportError(err, "socket");
    }
  });
}
