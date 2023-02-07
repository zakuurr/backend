import { Double } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import db from "../config/database.js";

const requestSchema = new Schema({
    nomor_invoice:  {
        type: String, 
    },
    nomor_polis:  {
        type: String,
    },
    jangka_waktu :{
        type: Number,
        require: true
    },
    okupasi: [{
        type : Schema.Types.ObjectId,
        ref: "okupasi"
    }],
    harga_bangunan: {
        type : Number,
        require: true
    },
    kontruksi: {
        type : String,
        require: true
    },
    alamat: {
        type : String,
        require: true
    },
    provinsi: {
        type : String,
        require: true
    },
    kota: {
        type : String,
        require: true
    },
    daerah:{
        type : String,
        require: true
    },
    gempa:{
        type: Boolean
    },
    premi_dasar:{
        type: Number
    },
    total:{
        type:Number
    },
    user:[{
        type : Schema.Types.ObjectId,
        ref: "user"
    }],
    status:{
        type : String,
    },
  });

const requestModel = mongoose.model('request', requestSchema);

// requestModel.createCollection().then(function (collection) {
//     console.log('Collection is created!');
// });

export default requestModel;