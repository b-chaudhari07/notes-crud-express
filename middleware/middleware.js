import { findbyid } from "../Models/usermodel.js";
import { getSession } from "../utils/sessionStore.js";

export function authcheck(req, res, next) {
  if (req.headers.authorization === "password") {
    next();
  } else {
    res.status(401).json({ msg: "authorization failed" });
  }
}

export function requireAuth(req, res, next){
  const sid= req.cookies.sid;
  const session= getSession(sid);
  if(!session){return res.status(401).json({"msg":"Please Login Again"})}
  const user= findbyid(session.userId);
  req.user= user;
  next();
}

export function logger(req, res, next){
  console.log(`${req.url} ,${req.method},  ${new Date().toISOString()}`);

  next();
}

export function globalErrorHandler(err, req, res, next){
  if(res.headersSent) return next(err);
  if(err.type === "entity.parse.failed"){
    return res.status(400).json({"Msg": "Invalid Json Body"});
  }

  console.log(err);
  res.status(500).json({"Msg": "Something Went Wrong"});
  
}