import UsersModel from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
const secret = "1234567890"

export const verifyUser = async (req,res,next)=>{
    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})
    console.log(info.id);
    if(!token){
        return res.status(401).json({msg:'Silahkan Login Terlebih Dahulu'})
    }
    const user = await UsersModel.findOne({
        _id : info.id
    }).populate({
        path: 'role',
        select: 'nama -_id' // <---------------'-_id' exclude _id field.
      });

    if(!user) return res.status(404).json({msg:"User tidak ada"})
   
    next();
}

export const adminOnly = async (req,res,next)=>{
    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})
    console.log(info.id);

    const user = await UsersModel.findOne({
        attributes:['id','name','email','role'],
        _id : info.id
    }).populate({
        path: 'role',
        select: 'nama -_id' // <---------------'-_id' exclude _id field.
      });

    if(!user) return res.status(404).json({msg:"User tidak ada"})
    if(user.role[0].nama !== "Administrator") return res.status(403).json({msg:"Akses Terlarang"})
    next();
}