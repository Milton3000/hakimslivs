import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddProductModal from '../adminhooks/order.hooks/addProductModal'; // Import the AddProductModal component

function Row(props) {
  const { row, onDelete, onUpdate } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);
  const [editingProductIndex, setEditingProductIndex] = React.useState(-1);
  const [newProductName, setNewProductName] = React.useState('');
  const [newProductQuantity, setNewProductQuantity] = React.useState('');
  const [showAddProductModal, setShowAddProductModal] = React.useState(false); // State for controlling the visibility of the AddProductModal

  const handleAddProduct = () => {
    const newProduct = { name: newProductName, quantity: parseFloat(newProductQuantity)};
    const updatedProducts = [...row.products, newProduct];
    onUpdate({ ...row, products: updatedProducts });
    setShowAddProductModal(false); // Hide the modal after adding the product
    setNewProductName('');
    setNewProductQuantity('');
  };

  const handleEditProduct = (index) => {
    console.log("Editing product at index:", index);
    setEditingProductIndex(index);
  };

  const handleUpdateProduct = (index, updatedProduct) => {
    const updatedProducts = [...row.products];
    updatedProducts[index] = updatedProduct;
    onUpdate({ ...row, products: updatedProducts });
    setEditingProductIndex(-1);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...row.products];
    updatedProducts.splice(index, 1);
    onUpdate({ ...row, products: updatedProducts });
  };

  // Function to calculate the total order value
  const calculateTotalValue = () => {
    return row.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  // Function to calculate product status
  const calculateProductStatus = (product) => {
    return product.confirmedQuantity === product.quantity ? 'Plockad' : 'Bearbetas';
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.orderId}</th>
        <td>{row.customerName}</td>
        <td>{row.deliveryMethod}</td>
        <td>{row.status}</td>
        <td>
          <IconButton aria-label="delete" onClick={() => onDelete(row.orderId)}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
      {open && (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <Sheet
                variant="soft"
                sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
              >
             
                <Typography level="body-lg" component="div">
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container for aligning the subheader and icon */}
                    <span>Produkter</span> {/* Subheader */}
                    {/* Action button to open AddProductModal */}
                    <IconButton aria-label="add product" onClick={() => setShowAddProductModal(true)}>
                      <AddIcon />
                    </IconButton>
                  </div>
                </Typography>
                <Table
                  borderAxis="bothBetween"
                  size="sm"
                  aria-label="products"
                  sx={{
                    '& > thead > tr > th': { textAlign: 'left' },
                  }}
                >
                  <thead>
                    <tr>
                      <th>Namn</th>
                      <th>Pris</th>
                      <th>Antal</th>
                      <th>Plockat antal</th>
                      <th>Status</th>
                      <th>Hantering</th>
                    </tr>
                  </thead>
                  <tbody>
                  {row.products.map((product, index) => (
  <React.Fragment key={index}>
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        {editingProductIndex === index ? (
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              handleUpdateProduct(index, {
                ...product,
                quantity: parseFloat(e.target.value),
              })
            }
          />
        ) : (
          product.quantity
        )}
      </td>
      <td>
        {editingProductIndex === index ? (
          <input
            type="number"
            value={product.confirmedQuantity}
            onChange={(e) =>
              handleUpdateProduct(index, {
                ...product,
                confirmedQuantity: parseFloat(e.target.value),
              })
            }
          />
        ) : (
          product.confirmedQuantity
        )}
      </td>
      <td>{calculateProductStatus(product)}</td>
      <td>
        {editingProductIndex === index ? (
          <IconButton
            aria-label="done"
            onClick={() => handleUpdateProduct(index, product)}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <React.Fragment>
            <IconButton aria-label="edit" onClick={() => handleEditProduct(index)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeleteProduct(index)}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        )}
      </td>
    </tr>
  </React.Fragment>
))}
                    {/* Add the final row for total order value */}
                    <tr>
                      <td colSpan={5}>Totalt ordervärde: {calculateTotalValue()}</td>
                    </tr>
                  </tbody>
                </Table>
                <AddProductModal
                  open={showAddProductModal}
                  onClose={() => setShowAddProductModal(false)}
                  onSave={handleAddProduct}
                />
              </Sheet>
            </td>
          </tr>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  initialOpen: PropTypes.bool,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    deliveryMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        confirmedQuantity: PropTypes.number.isRequired,
        status: PropTypes.oneOf(['Bearbetas', 'Plockad']).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from API using Axios
    axios.get('http://localhost:3001/api/orders/allorders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDelete = (orderId) => {
    // Implement delete functionality here
    console.log(`Deleting order with ID ${orderId}`);
  };

  const handleUpdate = (updatedOrder) => {
    // Implement update functionality here
    console.log('Updated Order:', updatedOrder);
  };

  return (
    <Sheet>
    <Table
      aria-label="order table"
      sx={{
        '& > thead > tr > th': { textAlign: 'left' },
      }}
    >
      <thead>
        <tr>
          <th style={{ width: 40 }} aria-label="empty" />
          <th>OrderID</th>
          <th>Kundnamn</th>
          <th>Leveranssätt</th>
          <th>Status</th>
          <th>Hantering</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <Row
            key={order._id}
            row={{
              orderId: order._id,
              customerName: order.guest ? `${order.guest.guestFirstName} ${order.guest.guestLastName}` : `${order.customer.firstName} ${order.customer.lastName}`,
              // customerEmail: order.guest ? order.guest.guestEmail : order.customer.email,
              deliveryMethod: order.deliveryMethod,
              status: order.orderStatus,
              products: order.products.map(product => ({
                name: product.product.title,
                price: product.product.price,
                quantity: product.quantity,
                confirmedQuantity: product.confirmedQuantity,
                status: product.status,
              })),
            }}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            initialOpen={index === 0}
          />
        ))}
      </tbody>
    </Table>
  </Sheet>
  );
}
