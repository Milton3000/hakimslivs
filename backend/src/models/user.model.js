import mongoose from "mongoose";

// User Schema för Användare.

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});


export const UserModel = mongoose.model("users", UserSchema);