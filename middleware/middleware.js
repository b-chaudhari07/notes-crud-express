import { getSession } from "../utils/sessionStore.js";
import User from "../Models/usermodel.js";

export async function requireAuth(req, res, next){
  const sid= req.cookies.sid;
  const session= getSession(sid);
  if(!session){return res.status(401).json({"msg":"Please Login Again"})}
  const user = await User.findById(session.userId)
  if (!user) return res.status(401).json({ msg: "Please Login Again" });
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

  if(err.name==="CastError"){
    return res.status(400).json({msg: "Invalid id"});
  }

  if(err.code=== 11000){
    return res.status(409).json({msg:"Already Exists"});
  }

  console.log(err);
  res.status(500).json({"Msg": "Something Went Wrong"});
  
}