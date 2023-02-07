import UsersModel from "../models/UsersModel.js";
import RoleModel from "../models/RoleModel.js";

export const getRole = async(req,res) => {
    try{
        const response = await RoleModel.find();
        res.status(200).json(response);
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}

export const getRoleById = (req,res) => {
    
}
export const createRole = async(req,res) => {
    const {nama} = req.body;


    try {
        await RoleModel.create({
            nama : nama,
        });
        res.status(201).json({msg:"Data Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

export const updateRole = (req,res) => {
    
}

export const deleteRole = (req,res) => {
    
}