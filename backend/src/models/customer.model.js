import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true, unique: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
});


const Customer = mongoose.model("Customer", customerSchema); 

export default Customer;