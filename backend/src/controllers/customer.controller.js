import bcrypt from 'bcrypt';
import Customer from '../models/customer.model.js';

async function registerCustomer(req, res) {

    try {
        const { username, password } = req.body;
        const customer = await Customer.findOne({ username });

        // Kollar om det redan finns en existerande user
        if (customer) {
            return res.json({ message: "User already exists." });
        }
        //bcrypt för att hasha lösenorden
        const hashedPassword = await bcrypt.hash(password, 10)
        const newCustomer = new Customer({ username, password: hashedPassword });
        await newCustomer.save();
        res.status(201).json(customer);
        
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