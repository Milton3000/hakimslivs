import bcrypt from 'bcrypt';
import Customer from '../models/customer.model.js';

async function registerCustomer(req, res) {
    try {
        const { password, ..._customer } = req.body;
        const customerEmail = await Customer.findOne({ email: _customer.email });

        if (customerEmail) {
            return res.status(400).json({ error: "Email already registered.", message: "User registration failed." });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const customer = await Customer.create({
                ..._customer,
                password: hashedPassword
            });
            res.status(201).json(customer);
        }
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getCustomers(req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { registerCustomer, getCustomers };