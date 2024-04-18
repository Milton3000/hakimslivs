import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

async function userLogin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User Doesn't Exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Username or Password Is Incorrect" });
        }

        // Check if the user is an admin
        if (!user.isAdmin) {
            return res.status(403).json({ message: "Access Forbidden. Only admin users can log in." });
        }

        // Issue a JWT token upon successful login
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { userLogin };