import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    guestFirstName: String,
    guestLastName: String,
    guestEmail: String,
    guestAddress: String,
    guestPhone: String
  }, { _id: false });
  
  const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', 
      required: false,
    },
    guest: {
      type: guestSchema, // Define guest information schema
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      confirmedQuantity: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        enum: ['In progress', 'Ready'],
        default: 'In progress',
      },
    }],
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  
  export default Order;