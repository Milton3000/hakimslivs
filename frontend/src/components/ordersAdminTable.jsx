import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddProductModal from '../adminhooks/order.hooks/addProductModal';
import InvoiceViewer from '../adminhooks/order.hooks/invoiceViewer';
import CollectionViewer from '../adminhooks/order.hooks/collectionViewer';

function Row(props) {
  const { row, onDeleteOrder, onUpdateOrder, onUpdateProduct, onDeleteProduct, onAddProduct } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);
  const [editingProductIndex, setEditingProductIndex] = React.useState(-1);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editingOrderIndex, setEditingOrderIndex] = React.useState(-1);
  const [editedOrder, setEditedOrder] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = React.useState(false);
  const [showInvoiceViewer, setShowInvoiceViewer] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);



  const handleEdit = (index) => {
    setEditingProductIndex(index);
    setEditingOrderIndex(index);
    if (row) {
      setEditedOrder(row);
    }
  };

  const handleUpdateProduct = (index) => {
    const updatedProducts = [...row.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      ...editedProduct,
      status: calculateProductStatus({ ...updatedProducts[index], ...editedProduct }) // calculate the status
    };
    onUpdateProduct({ ...row, products: updatedProducts });
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
        alert('Plockat antal överskrider beställt antal.');
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

  const handleUpdateOrder = (index) => {
    if (editedOrder) {
      onUpdateOrder({
        orderId: editedOrder.orderId,
        orderStatus: editedOrder.orderStatus,
        deliveryMethod: editedOrder.deliveryMethod
      });

      setEditedOrder(null); // Reset editedOrder
    } else {
      console.error('Cannot update order: editedOrder is null');
    }
  };

  const handleChangeOrder = (field, value) => {
    setEditedOrder(prevOrder => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  const handleDoneEditingOrder = (index) => {
    if (editedOrder && Object.keys(editedOrder).length > 0) {
      handleUpdateOrder(index);
    }
    setEditingOrderIndex(-1);
    setEditedOrder(null);
  };


  const handleDeleteProduct = (orderId, productIndex) => {
    const productId = row.products[productIndex].productId;
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

  const MAX_QUANTITY = 1000;

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
        <td>
          {editingOrderIndex === row.orderId ? (
            <select
              value={editedOrder ? editedOrder.deliveryMethod : ''}
              style={{
                width: '100%',
                boxSizing: 'border-box',
              }}
              onChange={(e) => handleChangeOrder('deliveryMethod', e.target.value)}
            >
              <option value="Hämtas">Hämtas</option>
              <option value="Levereras">Levereras</option>
            </select>
          ) : (
            row.deliveryMethod
          )}
        </td>
        <td>
          {editingOrderIndex === row.orderId ? (
            <select
              value={editedOrder ? editedOrder.orderStatus : ''}
              style={{
                width: '100%',
                boxSizing: 'border-box',
              }}
              onChange={(e) => handleChangeOrder('orderStatus', e.target.value)}
            >
              <option value="Bearbetas">Bearbetas</option>
              <option value="Hämtad">Hämtad</option>
              <option value="Skickad">Skickad</option>
              <option value="Levererad">Levererad</option>
            </select>
          ) : (
            row.orderStatus
          )}
        </td>
        <td>
          <IconButton
            aria-label="collect"
            onClick={() => {
              setShowInvoiceViewer(true);
              setInvoiceOrder(row);
              const pdfWindow = window.open('', '_blank');
              pdfWindow.document.write('<html><head><title>Invoice</title></head><body><div id="pdf-container"></div></body></html>');
              const container = pdfWindow.document.getElementById('pdf-container');
              ReactDOM.createRoot(container).render(<CollectionViewer order={row} />);
            }}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </td>
        <td>
          <IconButton
            aria-label="invoice"
            onClick={() => {
              setShowInvoiceViewer(true);
              setInvoiceOrder(row);
              const pdfWindow = window.open('', '_blank');
              pdfWindow.document.write('<html><head><title>Invoice</title></head><body><div id="pdf-container"></div></body></html>');
              const container = pdfWindow.document.getElementById('pdf-container');
              ReactDOM.createRoot(container).render(<InvoiceViewer order={row} />);
            }}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </td>
        <td>
          {editingOrderIndex === row.orderId ? (
            <IconButton
              aria-label="done"
              onClick={() => handleDoneEditingOrder(row.orderId)}
            >
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="edit" onClick={() => handleEdit(row.orderId)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton aria-label="delete" onClick={() => onDeleteOrder(row.orderId)}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
      {open && (
        <React.Fragment>
          <tr>
            <td colSpan={8}>
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
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Produkter</span> {/* Subheader */}
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
                                onChange={(e) => handleChange('quantity', Math.min(e.target.value, MAX_QUANTITY))}
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
                                <IconButton aria-label="edit" onClick={() => handleEdit(index)}>
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
    orderStatus: PropTypes.string.isRequired,
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
  onDeleteOrder: PropTypes.func.isRequired,
  onUpdateProduct: PropTypes.func.isRequired,
};

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://hakimslivs-backend.onrender.com/api/orders/allorders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  useEffect(() => {
  }, [orders]);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Vill du verkligen ta bort denna order?')) {
      axios.delete(`https://hakimslivs-backend.onrender.com/api/orders/delete/${orderId}`)
        .then(() => {
          setOrders(prevOrders => {
            return prevOrders.filter(order => order._id !== orderId);
          });
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    }
  };

  const handleUpdateOrder = (updatedOrder) => {
    const orderId = updatedOrder.orderId;

    axios.put(`https://hakimslivs-backend.onrender.com/api/orders/update/${orderId}`, {
      orderStatus: updatedOrder.orderStatus,
      deliveryMethod: updatedOrder.deliveryMethod
    }, {
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

  const handleDeleteProduct = (orderId, productId) => {
    if (window.confirm('Vill du verkligen ta bort denna produkt från ordern?')) {
      axios.put(`https://hakimslivs-backend.onrender.com/api/orders/deleteproduct/${orderId}/${productId}`)
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

  const handleUpdateProduct = (updatedOrderProduct) => {
    const orderId = updatedOrderProduct.orderId;

    updatedOrderProduct.products = updatedOrderProduct.products.map(product => ({
      product: product.productId,
      quantity: product.quantity,
      confirmedQuantity: product.confirmedQuantity,
      status: product.status
    }));

    axios.put(`https://hakimslivs-backend.onrender.com/api/orders/update/${orderId}`, updatedOrderProduct, {
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
    axios.put(`https://hakimslivs-backend.onrender.com/api/orders/addproduct/${orderId}`, {
      products: [product],
    })
      .then(response => {
        setOrders(prevOrders => {
          const orderIndex = prevOrders.findIndex(order => order._id.toString() === orderId.toString());
          if (orderIndex !== -1) {
            return [
              ...prevOrders.slice(0, orderIndex),
              { ...response.data, products: [...response.data.products] }, // Create a new object with a new reference
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
            <th>Plocklista</th>
            <th>Faktura</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <Row
              key={order._id}
              row={{
                orderId: order._id,
                customerNameFull: (order.guest ? `${order.guest.guestFirstName || ''} ${order.guest.guestLastName || ''}` : `${order.customer.firstName || ''} ${order.customer.lastName || ''}`),
                customerFirstName: order.guest ? order.guest.guestFirstName || '' : order.customer.firstName || '',
                customerLastName: order.guest ? order.guest.guestLastName || '' : order.customer.lastName || '',
                customerAddress: order.guest ? order.guest.guestAddress || '' : order.customer.address || '',
                customerPhone: order.guest ? order.guest.guestPhone || '' : order.customer.phone || '',
                customerEmail: order.guest ? order.guest.guestEmail || '' : order.customer.email || '',
                deliveryMethod: order.deliveryMethod || '',
                orderStatus: order.orderStatus || '',
                products: order.products.map(product => ({
                  name: (product.product && product.product.title) || '',
                  price: (product.product && product.product.price) || 0,
                  productId: (product.product && product.product._id) || '',
                  quantity: product.quantity || 0,
                  confirmedQuantity: product.confirmedQuantity || 0,
                  status: product.status || '',
                })),
              }}
              onDeleteOrder={handleDeleteOrder}
              onUpdateOrder={handleUpdateOrder}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onAddProduct={handleAddProduct}
            />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
