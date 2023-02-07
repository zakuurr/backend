import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import userRoute from './routes/UserRoute.js';
import roleRoute from './routes/RoleRoute.js';
import okupasiRoute from './routes/OkupasiRoute.js'
import requestRoute from './routes/RequestRoute.js'
import auth from './routes/Auth.js';
import UsersModel from './models/UsersModel.js';
import RoleModel from './models/RoleModel.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
dotenv.config();

// (async()=>{
//     await db;
// });


const app = express();

// session
app.use(session({
    secret : process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        secure : 'auto'
    }
}))
app.use(cors({credentials:true,origin:'http://localhost:4000'}));
app.use(express.json());
app.use(cookieParser());

app.use(userRoute);
app.use(roleRoute);
app.use(okupasiRoute);
app.use(requestRoute);
app.use(auth);

app.get('/',(req,res) => {
res.send('hello world');
});


app.listen(process.env.APP_PORT,()=>{
    console.log('Serve up and running...');
});