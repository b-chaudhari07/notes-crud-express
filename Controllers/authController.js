import { findbyusername, findbyid, createuser } from "../Models/usermodel.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createSession, deleteSession } from "../utils/sessionStore.js";


// each option is due to some security reason
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,            // set true in production (HTTPS)
  maxAge: 60 * 60 * 1000,   // match the session TTL
};

export async function registeruser( req , res){
    let username= req.body.username;
    let password= req.body.password;

    let u= findbyusername(username);
    
    if(u){
        res.status(409).json({"msg": "User with given username already exist"});
        return;
    }

    const passwordHash= await hashPassword(password);

    let user= createuser({username, passwordHash});
    res.status(201).json({id : user.id, username: user.username, "msg": "User created Successfully"});
}

export async function loginuser (req, res){
    const password= req.body.password;
    const username= req.body.username;

    const u= findbyusername(username);
    if (!u) return res.status(401).json({ msg: "Invalid credentials" });
    const hash= u.passwordHash
    const ok= await verifyPassword(password, hash);

    if (!ok) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const sessionId = createSession(u.id);
    res.cookie("sid", sessionId, COOKIE_OPTIONS);
    return res.status(200).json({ id: u.id, username: u.username });
    
}
export function logoutuser(req, res){
    const sid= req.cookies?.sid;
    if(sid) deleteSession(sid);

    res.clearCookie("sid", { httpOnly: true, sameSite: "lax", secure: false });
    return res.status(200).json({ msg: "Logged out" });
}