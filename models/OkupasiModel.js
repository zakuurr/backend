import { Double } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import db from "../config/database.js";

const okupasiSchema = new Schema({
    tipe_okupasi:  {
        type: String,
        required: true,
    },
    rate_premi:  {
        type: Number,
        required: true,
    }
  });

const okupasiModel = mongoose.model('okupasi', okupasiSchema);

// okupasiModel.createCollection().then(function (collection) {
//     console.log('Collection is created!');
// });

export default okupasiModel;