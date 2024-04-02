import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Customer from '../models/customer.model.js';


async function customerLogin(req, res) {

    try {
        const { username, password } = req.body;
        const customer = await Customer.findOne({ username });

        if (!customer) {
            return res.json({ message: "User Doesn't Exist." });
        }

        // Can't unhash a password, so we have to compare the passwords.
        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            return res.json({ message: "Username or Password Is Incorrect" });
        }

        //Secret for the token, used to verify the user is authenticated. 
        // Kan ändra "secret" till en environment variable senare för enklare användning.
        const token = jwt.sign({ id: customer._id }, "secret");
        res.json({ token, userID: customer._id });
    } catch (error) {
        console.error('Error logging in customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { customerLogin };

