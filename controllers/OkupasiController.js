import UsersModel from "../models/UsersModel.js";
import okupasiModel from "../models/OkupasiModel.js";
import RoleModel from "../models/RoleModel.js";
import argon2 from "argon2";
import { validationResult } from "express-validator";

export const getOkupasi = async(req,res) => {
        try{
        const response = await okupasiModel.find();
        res.status(200).json(response);
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}

export const getOkupasiById = async(req,res) => {
    try{
        const response = await okupasiModel.findOne({
            _id : req.params.id
        });
        res.status(200).json(response);
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}
export const createOkupasi = async(req,res) => {
    const {tipe_okupasi,rate_premi} = req.body;
    
    const errors = validationResult(req);

   
    try {
        await okupasiModel.create({
            tipe_okupasi : tipe_okupasi,
            rate_premi : rate_premi,
        });
        res.status(201).json({msg:"Data Berhasil di Masukan"});
    } catch (errors) {
       
            
        res.status(400).json({msg:errors.message});
        
        
    }
}

export const updateOkupasi = async(req,res) => {
    const okupasi = await okupasiModel.findOne({
        _id : req.params.id
    });

    if(!okupasi) return res.status(404).json({msg:"Okupasi tidak ada"})
    const {tipe_okupasi,rate_premi} = req.body;
    try {
        await okupasiModel.updateOne({
            _id : req.params.id
        },
            {
            tipe_okupasi : tipe_okupasi,
            rate_premi : rate_premi,
        });
        res.status(201).json({msg:"Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

export const deleteOkupasi = async(req,res) => {
    const okupasi = await okupasiModel.findOne({
        _id : req.params.id
    });

    try {
        await okupasiModel.deleteOne({_id : req.params.id});
        res.status(200).json({msg:"User Hapus Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}