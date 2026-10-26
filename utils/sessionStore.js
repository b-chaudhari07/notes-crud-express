import crypto from "crypto";

const sessions = new Map();
const TTL = 60 * 60 * 1000;

export function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + TTL;

  sessions.set(sessionId, { userId, expiresAt });
  return sessionId;
}
export function getSession(id) {
    const session= sessions.get(id);

    if(!session) return;
    if(session.expiresAt< Date.now()){
        deleteSession(id);
        return;
    }

    return session;
}
export function deleteSession(id) {
    sessions.delete(id);
}
