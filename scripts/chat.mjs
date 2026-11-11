/**
 * NPC Libertação: public chat lines for what the GM reveals (settings "anunciar" and "anunciarPA").
 */
import { MODULE_TITLE, escapeHTML } from "./constants.mjs";
import { TIERS } from "./data.mjs";
import { setting } from "./store.mjs";

async function post(html) {
  const cls = CONFIG.ChatMessage?.documentClass ?? globalThis.ChatMessage;
  return cls.create({ content: `<div class="npc-libertacao nl-chat">${html}</div>`, speaker: { alias: MODULE_TITLE } });
}

/** kind: "gosto" | "desgosto" | "demanda" | tier key | "morador" */
export async function announceReveal(npc, kind, value = "") {
  if ( !setting("anunciar", true) ) return;
  const name = `<strong>${escapeHTML(npc.nome)}</strong>`;
  const v = escapeHTML(value);
  let line;
  if ( kind === "gosto" ) line = `<i class="fa-solid fa-heart"></i> ${name} gosta de: ${v}.`;
  else if ( kind === "desgosto" ) line = `<i class="fa-solid fa-heart-crack"></i> ${name} não gosta de: ${v}.`;
  else if ( kind === "demanda" ) line = `<i class="fa-solid fa-scroll"></i> Última Demanda de ${name}: ${v}`;
  else if ( TIERS[kind] ) line = `<i class="fa-solid fa-gift"></i> Benefício ${TIERS[kind].label} (${TIERS[kind].range}) de ${name}: ${v}`;
  else if ( kind === "morador" ) line = `<i class="fa-solid fa-user-plus"></i> Vocês conheceram ${name}${npc.local ? ` (${escapeHTML(npc.local)})` : ""}.`;
  else return;
  return post(line);
}

export async function announcePa(npc, playerName, pa, tierLabel) {
  if ( !setting("anunciarPA", false) ) return;
  return post(`<i class="fa-solid fa-handshake"></i> <strong>${escapeHTML(playerName)}</strong> e <strong>${escapeHTML(npc.nome)}</strong>: ${pa} PA${tierLabel ? ` (${escapeHTML(tierLabel)})` : ""}.`);
}
