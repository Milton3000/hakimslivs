import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';


async function userLogin(req, res) {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ message: "User Doesn't Exist." });
        }

        // Can't unhash a password, so we have to compare the passwords.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ message: "Username or Password Is Incorrect" });
        }

        //Secret for the token, used to verify the user is authenticated. 
        // Kan ändra "secret" till en environment variable senare för enklare användning.
        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userID: user._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { userLogin };

