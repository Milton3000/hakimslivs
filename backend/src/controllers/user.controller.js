import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

async function registerUser(req, res) {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Kollar om det redan finns en existerande user
        if (user) {
            return res.json({ message: "User already exists." });
        }
        //bcrypt för att hasha lösenorden
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json(user);
        
    } catch (error) {
        
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { registerUser, getUser };