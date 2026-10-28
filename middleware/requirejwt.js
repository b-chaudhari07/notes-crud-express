import { findbyid } from "../Models/usermodel.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function verifyjwt(req, res, next){
    const header= req.headers.authorization;


    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({"msg": "Authentication failed"});   
    }

    const token= header.slice(7);
    const payload= verifyAccessToken(token);
    
    if(!payload) {return res.status(401).json({msg:"Authentication failed"});}
    const user= findbyid(payload.sub);

    if(!user) {return res.status(401).json({"msg": "Authentication failed"});   }
    req.user= user;
    next();
}