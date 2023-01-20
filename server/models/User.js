import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: String,   
    email: String,
    phone: String,
    password: String,
    role: String,
},
{ 
    timestamps: true
});

const User = model("User", UserSchema)

export default User;

