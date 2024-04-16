import Order from '../models/order.model.js';
import Customer from '../models/customer.model.js';
import mongoose from "mongoose";


async function createOrder(req, res) {
  try {
    const _order = req.body;

    const order = await Order.create({
      ..._order,
      Customer,
    })
    await order.populate("Customer")
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createOrder };

