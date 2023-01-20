import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('Connected to MongoDB');
})

// api routes starts here

app.post('/signup', async(req, res)=>{
    const { name, phone, email, password, role} = req.body;

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
    })

    const savedUser = await user.save();
    res.json({
        success: true,
        message: "User created successfully",
        data: savedUser
    })
})

// api routes ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})