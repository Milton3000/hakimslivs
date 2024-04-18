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
  const { row, onDelete, onUpdate, onDeleteProduct, onAddProduct } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);
  const [editingProductIndex, setEditingProductIndex] = React.useState(-1);
  const [editedProduct, setEditedProduct] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = React.useState(false); // State for controlling the visibility of the AddProductModal

  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
  };

  const handleUpdateProduct = (index) => {
    const updatedProducts = [...row.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      ...editedProduct,
      status: calculateProductStatus({ ...updatedProducts[index], ...editedProduct }) // calculate the status
    };
    onUpdate({ ...row, products: updatedProducts });
    setEditingProductIndex(-1);
  };
  
  const handleChange = (field, value) => {
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    // If the field is 'confirmedQuantity', ensure it does not exceed 'quantity'
    if (field === 'confirmedQuantity') {
      const product = row.products[editingProductIndex];
      if (product && parsedValue > product.quantity) {
        alert('Confirmed quantity cannot exceed quantity.');
        parsedValue = product.quantity;
      }
    }

    setEditedProduct(prevProduct => ({ ...prevProduct, [field]: parsedValue }));
  };

  const handleDoneEditing = (index) => {
    if (editedProduct && Object.keys(editedProduct).length > 0) {
      handleUpdateProduct(index);
    }
    setEditingProductIndex(-1);
    setEditedProduct(null);
  };

  const handleDeleteProduct = (orderId, productIndex) => {
    const productId = row.products[productIndex].productId;
    console.log(`Deleting product with ID ${productId} from order with ID ${orderId}`);
    onDeleteProduct(orderId, productId);

  }


  // Function to calculate the total order value
  const calculateTotalValue = () => {
    const totalPrice = row.products.reduce((total, product) => total + (product.price * product.quantity), 0);
    return totalPrice.toFixed(2); // Limit to two decimal places
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
        <td>{row.customerNameFull}</td>
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
                  <span>Kund</span>
                  <Table>
                    <thead>
                      <tr>
                        <th>Förnamn</th>
                        <th>Efternamn</th>
                        <th>Adress</th>
                        <th>Telefon</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{row.customerFirstName}</th>
                        <th>{row.customerLastName}</th>
                        <th>{row.customerAddress}</th>
                        <th>{row.customerPhone}</th>
                        <th>{row.customerEmail}</th>
                      </tr>
                    </tbody>
                  </Table>
                  <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container for aligning the subheader and icon */}
                    <span>Produkter</span> {/* Subheader */}
                    {/* Action button to open AddProductModal */}
                    <IconButton aria-label="add product" onClick={() => {
                      setCurrentOrderId(row.orderId);
                      setShowAddProductModal(true)
                    }}>
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
                      <th>Åtgärder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.products.map((product, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{product.name}</td>
                          <td>{product.price} SEK</td>
                          <td>
                            {editingProductIndex === index ? (
                              <input
                                type="number"
                                value={editedProduct?.quantity ?? product.quantity}
                                onChange={(e) => handleChange('quantity', e.target.value)}
                                style={{
                                  width: '100%',
                                  boxSizing: 'border-box',
                                }}
                              />
                            ) : (
                              product.quantity
                            )}
                          </td>
                          <td>
                            {editingProductIndex === index ? (
                              <input
                                type="number"
                                value={editedProduct?.confirmedQuantity ?? product.confirmedQuantity}
                                onChange={(e) => handleChange('confirmedQuantity', e.target.value)}
                                style={{
                                  width: '100%',
                                  boxSizing: 'border-box',
                                }}
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
                                onClick={() => handleDoneEditing(index)}
                              >
                                <DoneIcon />
                              </IconButton>
                            ) : (
                              <React.Fragment>
                                <IconButton aria-label="edit" onClick={() => handleEditProduct(index)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDeleteProduct(row.orderId, index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </React.Fragment>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                    <tr>
                      <td colSpan={5}>Totalt ordervärde: {calculateTotalValue()} SEK</td>
                    </tr>
                  </tbody>
                </Table>
                <AddProductModal
                  open={showAddProductModal}
                  onClose={() => setShowAddProductModal(false)}
                  orderId={currentOrderId}
                  onSave={onAddProduct}
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
    customerNameFull: PropTypes.string.isRequired,
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
    axios.get('http://localhost:3001/api/orders/allorders')
    .then(response => {
      setOrders(response.data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, []);
  
  useEffect(() => {
    console.log('Orders state updated:', orders);
  }, [orders]);

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:3001/api/orders/delete/${orderId}`)
        .then(() => {
          setOrders(prevOrders => {
            return prevOrders.filter(order => order._id !== orderId);
          });
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });

      console.log(`Deleting order with ID ${orderId}`);
    }
  };

  const deleteProduct = (orderId, productId) => {
    if (window.confirm('Are you sure you want to delete this product from the order?')) {
      axios.put(`http://localhost:3001/api/orders/deleteproduct/${orderId}/${productId}`)
        .then(response => {
          setOrders(prevOrders => {
            return prevOrders.map(order => {
              return order._id === orderId ? response.data : order; // Replace the updated order
            });
          });
        })
        .catch(error => {
          console.error('Error deleting product from order:', error);
        });
    }
  };

  const handleUpdate = (updatedOrder) => {
    const orderId = updatedOrder.orderId;
    // Update the products array in the original order object
    updatedOrder.products = updatedOrder.products.map(product => ({
      product: product.productId,
      quantity: product.quantity,
      confirmedQuantity: product.confirmedQuantity,
      status: product.status
    }));

    axios.put(`http://localhost:3001/api/orders/update/${orderId}`, updatedOrder, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setOrders(prevOrders => {
          return prevOrders.map(order => {
            return order._id === orderId ? response.data : order; // Replace the updated order
          });
        });
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  };

  
  const handleAddProduct = (orderId, product) => {
    axios.put(`http://localhost:3001/api/orders/addproduct/${orderId}`, {
      products: [product],
    })
      .then(response => {
        console.log('Response data:', response.data);
        setOrders(prevOrders => {
          const orderIndex = prevOrders.findIndex(order => order._id.toString() === orderId.toString());
          if (orderIndex !== -1) {
            return [
              ...prevOrders.slice(0, orderIndex),
              {...response.data, products: [...response.data.products]}, // Create a new object with a new reference
              ...prevOrders.slice(orderIndex + 1)
            ];
          }
          return prevOrders;
        });
      })
      .catch(error => {
        console.error('Error adding product to order:', error);
      });
  };


  return (
    <Sheet>
      <Table
        aria-label="order table"
        sx={{
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          '& > thead > tr > th': { textAlign: 'left' },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th>OrderID</th>
            <th>Kund / Gäst</th>
            <th>Leveranssätt</th>
            <th>Status</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <Row
              key={order._id}
              row={{
                orderId: order._id,
                customerNameFull: order.guest ? `${order.guest.guestFirstName} ${order.guest.guestLastName}` : `${order.customer.firstName} ${order.customer.lastName}`,
                customerFirstName: order.guest ? order.guest.guestFirstName : order.customer.firstName,
                customerLastName: order.guest ? order.guest.guestLastName : order.customer.lastName,
                customerAddress: order.guest ? order.guest.guestAddress : order.customer.address,
                customerPhone: order.guest ? order.guest.guestPhone : order.customer.phone,
                customerEmail: order.guest ? order.guest.guestEmail : order.customer.email,
                deliveryMethod: order.deliveryMethod,
                status: order.orderStatus,
                products: order.products.map(product => ({
                  name: product.product.title,
                  price: product.product.price,
                  productId: product.product._id,
                  quantity: product.quantity,
                  confirmedQuantity: product.confirmedQuantity,
                  status: product.status,
                })),
              }}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onDeleteProduct={deleteProduct}
              onAddProduct={handleAddProduct}
            />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
