/**
 * NPC Libertação: constants and small helpers. Labels are Portuguese (no lang files).
 */
export const MODULE_ID = "npc-libertacao";
export const MODULE_TITLE = "NPCs de Candeh'ssa";
export const SOCKET = `module.${MODULE_ID}`;
export const TEMPLATES = `modules/${MODULE_ID}/templates`;

export const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
));

/** Initials and a stable colour for a portrait without image. */
export function initials(name) {
  const parts = String(name ?? "?").replace(/[^\p{L}\s&]/gu, "").split(/[\s&]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function colorFor(name) {
  let h = 0;
  for ( const ch of String(name ?? "") ) h = (h * 31 + ch.codePointAt(0)) % 360;
  return `hsl(${h}, 42%, 38%)`;
}

const DIACRITICS = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, "g");
export const fold = s => String(s ?? "").normalize("NFD").replace(DIACRITICS, "").toLowerCase();
