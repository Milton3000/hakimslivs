import Order from '../models/order.model.js';
import Product from '../models/product.model.js'

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

async function getOrders(req, res) {
  try {
    const orders = await Order.find().populate("customer products.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function updateOrder(req, res) {
  const { id } = req.params;
  const _order = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    _order.products.forEach(updatedProduct => {
      const existingProductIndex = order.products.findIndex(product => product.product.equals(updatedProduct.product));
      if (existingProductIndex !== -1) {
        order.products[existingProductIndex].quantity = updatedProduct.quantity;
        order.products[existingProductIndex].confirmedQuantity = updatedProduct.confirmedQuantity;
        order.products[existingProductIndex].status = updatedProduct.status;
      }
    });

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export { createOrder, getOrders, updateOrder };

