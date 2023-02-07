import mongoose from 'mongoose';
const { Schema } = mongoose;
import db from "../config/database.js";

const roleSchema = new Schema({
    nama:  {
        type: String,
        required: true,
    },
  });

const RoleModel = mongoose.model('role', roleSchema);

export default RoleModel;