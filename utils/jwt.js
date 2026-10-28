import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET= process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET missing or too short (min 32 chars)");
}

const ACCESS_TTL= "15m";
const ALGORITHM= "HS256";

export  function generateAccessToken(userid){
    const payload= {sub:userid};
    return jwt.sign(payload, SECRET, {
        algorithm : ALGORITHM,
        expiresIn: ACCESS_TTL,
    })
}

export function verifyAccessToken(token){
    try {
        const payload= jwt.verify(token, SECRET,{ alorithms:[ALGORITHM]});
        if (typeof payload === "string" || typeof payload.sub !== "string") {
          return null;
        }

        return payload;
    } catch (e) {
        return null;
    }
}