import UsersModel from "../models/UsersModel.js";
import RoleModel from "../models/RoleModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
const secret = "1234567890"
export const getUsers = async(req,res) => {
try{
const response = await UsersModel.find().populate("role");
res.status(200).json(response);
}catch (error){
res.status(500).json({msg:error.message});
}
}

export const getUsersById = async(req,res) => {
    try{
        const response = await UsersModel.findOne({
            _id : req.params.id
        });
        res.status(200).json(response);
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}

export const getMyProfile = async (req,res) => {
    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})
          try{
            console.log("ini info id",info?.id)
            const response = await UsersModel.find({ _id: info?.id }, '_id nama email')
            res.status(200).json(response);
            }catch (error){
            res.status(500).json({msg:error.message});
            }
            
        }

export const createUser = async(req,res) => {
    const {nama,email,password,confPassword,role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg:"Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);

    try {
        await UsersModel.create({
            nama : nama,
            email : email,
            password : hashPassword,
            role : role
        });
        res.status(201).json({msg:"Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

export const updateUser = async(req,res) => {
    const user = await UsersModel.findOne({
        _id : req.params.id
    });

    if(!user) return res.status(404).json({msg:"User tidak ada"})
    const {nama,email} = req.body;
  
    try {
        await UsersModel.updateOne({
            _id : req.params.id
        },
            {
            nama : nama,
            email : email,

        });
        res.status(201).json({msg:"User Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

export const deleteUser = async(req,res) => {
    const user = await UsersModel.findOne({
        _id : req.params.id
    });
    if(!user) return res.status(404).json({msg:"User tidak ada"})
    try {
        await UsersModel.deleteOne({_id : req.params.id});
        res.status(200).json({msg:"User Hapus Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}