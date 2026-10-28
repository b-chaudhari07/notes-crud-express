import crypto from "crypto";

const store = new Map(); // hash(token) → { userId, expiresAt }
const REFRESH_TTL = 7 * 24 * 60 * 60 * 1000;

function hash(raw) {
  /* sha256 → hex */
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export function saveRefresh(userId) {
  /* returns raw token */
  const raw = crypto.randomBytes(48).toString("hex");
  const hashed= hash(raw);
  store.set(hashed , {userId, expiresAt: Date.now()+ REFRESH_TTL});
  return raw;
}
export function consumeRefresh(raw) {
  /* returns userId or undefined, deletes entry */
  const entry= store.get(hash(raw));
  if(!entry) return undefined;

  store.delete(hash(raw));
  if(entry.expiresAt< Date.now()) return undefined;
  return entry.userId;
}

export function revokeRefresh(raw) {
  /* deletes entry */
  store.delete(hash(raw));
}
