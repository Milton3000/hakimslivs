import Order from '../models/order.model.js';

async function createOrder(req, res) {
  try {
    const _order = req.body;

    const order = await Order.create({
      ..._order,
      customer: _order.customer,
      products: _order.products
    })
    await order.populate("customer products.product")
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createOrder };

