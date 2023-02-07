import mongoose from "mongoose";


const db = mongoose.connect('mongodb+srv://rezakurnia:rezakurnia123@cluster0.npnhgbg.mongodb.net/mern',{useNewUrlParser: true});

export default db;