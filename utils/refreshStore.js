import crypto from "crypto";
import RefreshToken from "../Models/refreshTokenModel.js";

const REFRESH_TTL = 7 * 24 * 60 * 60 * 1000;

function hash(raw) {
  /* sha256 → hex */
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export async function saveRefresh(userId) {
  /* returns raw token */
  const raw = crypto.randomBytes(48).toString("hex");
  const hashed= hash(raw);
  const refreshToken= await RefreshToken.create({tokenHash: hashed, userId:userId, expiresAt: new Date( Date.now()+ REFRESH_TTL )})
  return raw;
}

export async function consumeRefresh(raw) {
  /* returns userId or undefined, deletes entry */
  const hashed= hash(raw);
  const refreshToken = await RefreshToken.findOneAndDelete({tokenHash: hashed});
  if(!refreshToken) return undefined;
  if(refreshToken.expiresAt < Date.now()) return undefined;
  return refreshToken.userId.toString();
}

export async function revokeRefresh(raw) {
  /* deletes entry */
  await RefreshToken.deleteOne({tokenHash: hash(raw) });
}
