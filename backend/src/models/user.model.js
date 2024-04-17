// user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // New field to indicate admin status
});

const User = mongoose.model("User", userSchema);

export default User;
