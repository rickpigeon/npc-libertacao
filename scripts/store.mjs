/**
 * NPC Libertação: storage. Three world settings (only GMs write them, every client reads them):
 *   moradores  { list: [npc] }                         the residents, with what is revealed
 *   afinidade  { map: { npcId: { playerId: { pa, ud, ativo } } } }
 *   jogadores  { list: [{ id, name, userId }] }        the player characters the GM tracks
 * An empty `moradores` means "the book's list as it starts" (so players see it before the GM saves).
 * Note: world settings reach every client, so a player who digs in the browser console could read
 * hidden entries. The window never shows them to players.
 */
import { MODULE_ID } from "./constants.mjs";
import { BOOK_NPCS, PA_MAX, TIERS } from "./data.mjs";

export function registerSettings(onChange) {
  const changed = () => onChange?.();
  game.settings.register(MODULE_ID, "moradores", { scope: "world", config: false, type: Object, default: { list: [] }, onChange: changed });
  game.settings.register(MODULE_ID, "afinidade", { scope: "world", config: false, type: Object, default: { map: {} }, onChange: changed });
  game.settings.register(MODULE_ID, "jogadores", { scope: "world", config: false, type: Object, default: { list: [] }, onChange: changed });
  game.settings.register(MODULE_ID, "verTodos", {
    name: "Jogadores veem a afinidade de todos",
    hint: "Ligado: cada jogador vê os Pontos de Afinidade de todo o grupo. Desligado: só os do próprio personagem (ligue o jogador ao usuário em Jogadores…).",
    scope: "world", config: true, type: Boolean, default: true, onChange: changed
  });
  game.settings.register(MODULE_ID, "anunciar", {
    name: "Anunciar revelações no chat",
    hint: "Quando o mestre revela um gosto, um desgosto, a Última Demanda, um benefício ou um morador, sai uma mensagem no chat.",
    scope: "world", config: true, type: Boolean, default: true
  });
  game.settings.register(MODULE_ID, "anunciarPA", {
    name: "Anunciar Pontos de Afinidade no chat",
    hint: "Quando o mestre muda os PA de alguém, sai uma mensagem no chat.",
    scope: "world", config: true, type: Boolean, default: false
  });
}

export const setting = (key, fallback) => {
  try {
    return game.settings.get(MODULE_ID, key);
  } catch {
    return fallback;
  }
};

/* -------------------------------------------- */
/*  Residents                                   */
/* -------------------------------------------- */

const text = (v, max = 2000) => String(v ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);
const bool = v => v === true || v === "true" || v === "on";
const entry = (raw, max = 1500) => {
  if ( raw && typeof raw === "object" ) return { t: text(raw.t, max), rev: bool(raw.rev) };
  return { t: text(raw, max), rev: false };
};
const list = (raw, max = 30) => (Array.isArray(raw) ? raw : []).map(x => entry(x, 200)).filter(x => x.t).slice(0, max);

export const TIER_KEYS = Object.keys(TIERS);

/** Coerce anything (stored data, the book entry, a form) into a resident. */
export function normalizeNpc(raw = {}) {
  const out = {
    id: text(raw.id, 64) || foundry.utils.randomID(),
    book: bool(raw.book),
    nome: text(raw.nome, 80) || "Sem nome",
    img: text(raw.img, 500),
    local: text(raw.local, 80),
    pagina: text(raw.pagina, 20),
    descricao: text(raw.descricao, 3000),
    gostos: list(raw.gostos),
    desgostos: list(raw.desgostos),
    demanda: entry(raw.demanda),
    notas: text(raw.notas, 3000),
    oculto: bool(raw.oculto)
  };
  for ( const k of TIER_KEYS ) out[k] = entry(raw[k]);
  return out;
}

/** A book resident as it starts: nothing about likes, demand or benefits revealed. */
export function fromBook(b) {
  return normalizeNpc({ ...b, book: true, oculto: !!b.oculto });
}

export function bookEntry(id) {
  return BOOK_NPCS.find(b => b.id === id) ?? null;
}

const byName = (a, b) => a.nome.localeCompare(b.nome, "pt-BR");

export function getNpcs() {
  const stored = setting("moradores", { list: [] });
  const raw = Array.isArray(stored?.list) && stored.list.length ? stored.list : BOOK_NPCS.map(b => ({ ...b, book: true }));
  return raw.map(normalizeNpc).sort(byName);
}

export function getNpc(id) {
  return getNpcs().find(n => n.id === id) ?? null;
}

export async function saveNpcs(npcs) {
  if ( !game.user.isGM ) throw new Error("Só o mestre muda os moradores.");
  await game.settings.set(MODULE_ID, "moradores", { list: npcs.map(normalizeNpc) });
}

/** Change one resident with `fn(npc)` and save. Returns the changed copy. */
export async function updateNpc(id, fn) {
  const npcs = getNpcs();
  const npc = npcs.find(n => n.id === id);
  if ( !npc ) throw new Error("Esse morador não existe mais.");
  fn(npc);
  await saveNpcs(npcs);
  return npc;
}

/* -------------------------------------------- */
/*  Players and affinity                        */
/* -------------------------------------------- */

export function getPlayers() {
  const stored = setting("jogadores", { list: [] });
  return (Array.isArray(stored?.list) ? stored.list : [])
    .map(p => ({ id: text(p?.id, 64) || foundry.utils.randomID(), name: text(p?.name, 80), userId: text(p?.userId, 64) }))
    .filter(p => p.name);
}

export async function savePlayers(players) {
  if ( !game.user.isGM ) throw new Error("Só o mestre muda os jogadores.");
  await game.settings.set(MODULE_ID, "jogadores", { list: players });
}

const clampPa = v => Math.max(0, Math.min(PA_MAX, Math.round(Number(v) || 0)));

export function getAffinity() {
  const stored = setting("afinidade", { map: {} });
  const map = stored?.map && typeof stored.map === "object" ? stored.map : {};
  const out = {};
  for ( const [npcId, rows] of Object.entries(map) ) {
    if ( !rows || typeof rows !== "object" ) continue;
    out[npcId] = {};
    for ( const [pid, v] of Object.entries(rows) ) out[npcId][pid] = { pa: clampPa(v?.pa), ud: bool(v?.ud), ativo: bool(v?.ativo) };
  }
  return out;
}

export function affinityOf(map, npcId, playerId) {
  return map[npcId]?.[playerId] ?? { pa: 0, ud: false, ativo: false };
}

/** Change one player's affinity with one resident. Only one active resident per player (p. 35). */
export async function setAffinity(npcId, playerId, patch) {
  if ( !game.user.isGM ) throw new Error("Só o mestre muda a afinidade.");
  const map = getAffinity();
  const cur = { ...affinityOf(map, npcId, playerId), ...patch };
  cur.pa = clampPa(cur.pa);
  if ( patch.ativo ) {
    for ( const rows of Object.values(map) ) if ( rows[playerId] ) rows[playerId].ativo = false;
  }
  map[npcId] = { ...(map[npcId] ?? {}), [playerId]: cur };
  await game.settings.set(MODULE_ID, "afinidade", { map });
  return cur;
}

/** Forget every player's affinity with a resident that was deleted. */
export async function dropAffinity(npcId) {
  if ( !game.user.isGM ) throw new Error("Só o mestre muda a afinidade.");
  const map = getAffinity();
  if ( !(npcId in map) ) return;
  delete map[npcId];
  await game.settings.set(MODULE_ID, "afinidade", { map });
}

/** "Cordial", "Leal", "Íntimo" or "" (Íntimo needs 7 PA and the Última Demanda, p. 35). */
export function tierOf(pa, ud) {
  if ( pa >= PA_MAX && ud ) return "intimo";
  if ( pa >= 4 ) return "leal";
  if ( pa >= 1 ) return "cordial";
  return "";
}
