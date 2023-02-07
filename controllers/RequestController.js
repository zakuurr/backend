import UsersModel from "../models/UsersModel.js";
import okupasiModel from "../models/OkupasiModel.js";
import RoleModel from "../models/RoleModel.js";
import argon2 from "argon2";
import requestModel from "../models/RequestModel.js";
import { request } from "express";
import jwt from "jsonwebtoken";

const secret = "1234567890"
const total = 10000;

export const getRequest = async(req,res) => {
        try{
        const response = await requestModel.find().populate('okupasi','tipe_okupasi rate_premi');
        res.status(200).json(response);
        console.log(response.okupasi)
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}

export const getInvoice = async(req,res) => {
    try{
    const response = await requestModel.find(req.query).select("nomor_invoice jangka_waktu harga_bangunan premi_dasar total").limit(1).sort({ _id: -1 });
    res.status(200).json(response);
 
    }catch (error){
    res.status(500).json({msg:error.message});
    }
}

export const getListRequest = async(req,res) => {
    try{
    const response = await requestModel.find(req.query).select("_id nomor_invoice alamat total").populate('okupasi','tipe_okupasi -_id');
    res.status(200).json(response);
 
    }catch (error){
    res.status(500).json({msg:error.message});
    }
}

export const getMyRequest = async (req,res) => {
    const {token} = req.cookies;
    const info = jwt.verify(token, secret, {})
          try{
            console.log("ini info my request",requestModel.find())
            const response = await requestModel.find({ user: info?.id }, '_id nomor_invoice nomor_polis status')
            res.status(200).json(response);
            }catch (error){
            res.status(500).json({msg:error.message});
            }
            
        }
    



export const getRequestById = async(req,res) => {
    try{
        const response = await requestModel.findOne({
            _id : req.params.id
        });
        res.status(200).json(response);
        }catch (error){
        res.status(500).json({msg:error.message});
        }
}
export const createRequest = async(req,res) => {
    const {user,jangka_waktu,okupasi,harga_bangunan,kontruksi,alamat,provinsi,kota,daerah,nomor_invoice,gempa} = req.body;
console.log('idUser',user);
    const okupasimodel = await okupasiModel.findOne({ _id : okupasi});
console.log('Hallo' ,okupasimodel?.rate_premi);

//Hitung Premi Dasar
let hitung_premi_dasar = harga_bangunan * okupasimodel?.rate_premi / 1000 * jangka_waktu;

//Hitung Total

let total_bayar = hitung_premi_dasar + total;

const totalNumberOfEmpInDb = await requestModel.countDocuments();
let numberToString = totalNumberOfEmpInDb.toString();
if(numberToString.length < 5){
    for (let i = numberToString.length; i < 5; i++){
        numberToString = '0' + numberToString;
    }
}

    try {
       const response =  await requestModel.create({
            nomor_invoice : `K.001.${numberToString}`,
            premi_dasar :hitung_premi_dasar,
            jangka_waktu : jangka_waktu,
            okupasi : okupasi,
            harga_bangunan: harga_bangunan,
            kontruksi: kontruksi,
            alamat:alamat,
            provinsi:provinsi,
            kota:kota,
            daerah:daerah,
            total:total_bayar,
            gempa:gempa,
            user:user,
        });
  
        res.status(201).json(response);
    } catch (error) {
       
        res.status(400).json({msg:error.message});
    }
}

export const updateApprove = async(req,res) => {

    const totalNumberOfEmpInDb = await requestModel.countDocuments();
    let numberToString = totalNumberOfEmpInDb.toString();
    if(numberToString.length < 5){
        for (let i = numberToString.length; i < 5; i++){
            numberToString = '0' + numberToString;
        }
    }

try{
const approve = await requestModel.updateOne(
    {
        _id:req.params.id,
        
    },
    { status: 'Sudah Dibayar', nomor_polis: `K.01.001.${numberToString}`})
    res.status(200).json(approve);
}catch(error){
    res.status(400).json({msg:error.message});
}
}


export const updateReject = async(req,res) => {

    const totalNumberOfEmpInDb = await requestModel.countDocuments();
    let numberToString = totalNumberOfEmpInDb.toString();
    if(numberToString.length < 5){
        for (let i = numberToString.length; i < 5; i++){
            numberToString = '0' + numberToString;
        }
    }

try{
const reject = await requestModel.updateOne(
    {
        _id:req.params.id,
        
    },
    { status: 'Belum Dibayar', nomor_polis: `belum terbit`})
    res.status(200).json(reject);
}catch(error){
    res.status(400).json({msg:error.message});
}
}


// export const deleteOkupasi = async(req,res) => {
//     const okupasi = await okupasiModel.findOne({
//         _id : req.params.id
//     });

//     try {
//         await okupasiModel.deleteOne({_id : req.params.id});
//         res.status(200).json({msg:"User Hapus Berhasil"});
//     } catch (error) {
//         res.status(400).json({msg:error.message});
//     }
// }