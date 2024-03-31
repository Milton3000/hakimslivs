import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';


const router = express.Router();


// BAS KOD FÖR USERS SENARE, PÅBÖRJAT FÖR ATT HÅLLA FILERNA KLARA


// REGISTER 
router.post("/register", async (req, res) => {
const { username, password } = req.body;

const user = await UserModel.findOne({ username });

// Kollar om det redan finns en existerande user
if(user) {
    return res.json({message: "User already exists." });
}

//bcrypt för att hasha lösenorden
const hashedPassword = await bcrypt.hash(password, 10)

const newUser = new UserModel({ username, password: hashedPassword });
await newUser.save();

res.json({message: "User Registered Successfully" });
});


// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    // If not a user
    if (!user) {
      return res.json({ message: "User Doesn't Exist." });
    }
  
    // Can't unhash a password, so we have to compare the passwords.
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.json({ message: "Username or Password Is Incorrect" });
    }

    //Secret used to verify the user is authentic. 
  
    const token = jwt.sign({ id: user._id }, "secret"); 
    res.json({ token, userID: user._id });
  });




export { router as userRouter };