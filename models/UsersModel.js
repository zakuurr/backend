import mongoose from 'mongoose';
const { Schema } = mongoose;
import db from "../config/database.js";

const userSchema = new Schema({
    nama:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true,
        min: 8
    },
    role: [{
        type : Schema.Types.ObjectId,
        ref: "role"
    }]
  });

const UsersModel = mongoose.model('user', userSchema);

export default UsersModel;