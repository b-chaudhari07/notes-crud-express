import User from "../Models/usermodel.js";
import { generateAccessToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { consumeRefresh, revokeRefresh, saveRefresh } from "../utils/refreshStore.js";



export async function registeruser( req , res){
    let username= req.body.username;
    let password= req.body.password;

    let u= await User.findOne({username: username});
    
    if(u){
        res.status(409).json({"msg": "User with given username already exist"});
        return;
    }

    const passwordHash= await hashPassword(password);

    let user = await User.create({ username: username, passwordHash : passwordHash, });
    res.status(201).json({id : user.id, username: user.username, "msg": "User created Successfully"});
}

export async function loginuser (req, res){
    const password= req.body.password;
    const username= req.body.username;

    const u= await User.findOne({username: username});
    if (!u) return res.status(401).json({ msg: "Invalid credentials" });
    const hash= u.passwordHash
    const ok= await verifyPassword(password, hash);

    if (!ok) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const accessToken=generateAccessToken(u.id);
    const refreshToken= await saveRefresh(u.id);
    return res.status(200).json({msg:"Login successfull", id: u.id, username: u.username , accessToken,refreshToken, tokenType:"Bearer"});
    
}

export async function logoutuser(req, res){
    await revokeRefresh(req.body.refreshToken);
    return res.status(200).json({ msg: "Logged out" });
}

export async function refreshhandler(req, res){
    const {refreshToken}= req.body;
    const userId= await consumeRefresh(refreshToken);
    if (!userId) return res.status(401).json({ msg: "Login again" });
    const user= await User.findById(userId);

    if(!user){return res.status(401).json({msg : "Login Again"})};
    const newAccess= generateAccessToken(user.id);
    const newRefresh= await saveRefresh(user.id);

    return res.status(200).json({accessToken:newAccess, refreshToken: newRefresh, tokenType: "Bearer"});

}