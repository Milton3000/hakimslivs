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
    let order = await Order.findById(id);
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

    await order.save();
    order = await Order.findById(id).populate('customer products.product');
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Add product to existing order

async function addProductToOrder(req, res) {
  const { id } = req.params;
  const products = req.body.products; // Get the array of products from the request body
  try {
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Loop over the array of products
    for (let _product of products) {
      const product = await Product.findById(_product.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found with id ${_product.product}` });
      }
      order.products.push({
        product: _product.product,
        quantity: _product.quantity,
        status: _product.status,
      });
    }

    await order.save();
    order = await Order.findById(id).populate('customer products.product');
    res.status(200).json(order);
  } catch (error) {
    console.error('Error adding product to order:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}


/// Delete product from existing order
async function deleteProductFromOrder(req, res) {
  const { id, productId } = req.params;
  try {
    let order = await Order
      .findById(id)
      .populate('products.product');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const productIndex = order.products.findIndex(product => product.product._id == productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }
    order.products.splice(productIndex, 1);
    await order.save();
    order = await Order.findById(id).populate('customer products.product');
    res.status(200).json(order);
  }
  catch (error) {
    console.error('Error deleting product from order:', error);
    res.status(500).json({ message: "Internal server error" });
  }

}

  async function deleteOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  }



  export { createOrder, getOrders, updateOrder, deleteOrder, addProductToOrder, deleteProductFromOrder };

