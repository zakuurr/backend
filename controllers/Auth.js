import UsersModel from "../models/UsersModel.js";
import argon2  from "argon2";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

const secret = "1234567890"


export const login = async (req,res) => {
    const{email,password} = req.body;
    const user = await UsersModel.findOne({email : email}).populate({
        path: 'role',
        select: 'nama -_id' // <---------------'-_id' exclude _id field.
      });

    if(!user) return res.status(404).json({msg:"User tidak ada"})
    // Verifikasi Password
    const match = await argon2.verify(user.password, password);

    if (match) {
        // logged in
        const token = jwt.sign({nama:user.nama,email,id:user._id,role:user.role[0].nama}, secret, {})
       console.log(token);
          res.cookie('token', token).json({
            id:user._id,
            email,
            role:user.role[0].nama
          });
      } else {
        res.status(400).json('wrong credentials');
      }
}

export const Profile = async (req,res) => {
  const {token} = req.cookies;
  console.log('ini token :',token);
    const info = jwt.verify(token, secret, {})
      res.json(info);
  }

export const Logout = async (req,res) => {
  res.cookie('token', '').json('ok');
}