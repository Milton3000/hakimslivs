import * as React from 'react';
import PropTypes from 'prop-types';
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
import AddProductModal from '../adminhooks/order.hooks/addProductModa'; // Import the AddProductModal component

function createData(orderId, customerName, customerId, status, products) {
  return {
    orderId,
    customerName,
    customerId,
    status,
    products,
  };
}

function Row(props) {
  const { row, onDelete, onUpdate } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);
  const [editingProductIndex, setEditingProductIndex] = React.useState(-1);
  const [newProductName, setNewProductName] = React.useState('');
  const [newProductQuantity, setNewProductQuantity] = React.useState('');
  const [showAddProductModal, setShowAddProductModal] = React.useState(false); // State for controlling the visibility of the AddProductModal
  const [confirmedQuantities, setConfirmedQuantities] = React.useState('');

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

  const handleConfirmedQuantityChange = (index, confirmedQuantity) => {
    const updatedProducts = [...row.products];
    updatedProducts[index].confirmedQuantity = confirmedQuantity;
    onUpdate({ ...row, products: updatedProducts });
  };

  // Function to calculate the total order value
  const calculateTotalValue = () => {
    return row.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  // Function to calculate product status
  const calculateProductStatus = (product) => {
    return product.confirmedQuantity === product.quantity ? 'Ready' : 'In progress';
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
        <td>{row.customerId}</td>
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
                    <span>Products</span> {/* Subheader */}
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
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Confirmed Quantity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {row.products.map((product, index) => (
  <React.Fragment key={index}>
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
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
                      <td colSpan={5}>Total order value: {calculateTotalValue()}</td>
                    </tr>
                  </tbody>
                </Table>
                {/* AddProductModal component */}
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
    customerId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        confirmedQuantity: PropTypes.number.isRequired,
        status: PropTypes.oneOf(['In progress', 'Ready']).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const orders = [
  createData('ORD001', 'John Doe', 'CUST001', 'Pending', [
    { name: 'Product A', price: 10, quantity: 2, confirmedQuantity: 1, status: 'In progress' },
    { name: 'Product B', price: 20, quantity: 3, confirmedQuantity: 2, status: 'In progress' },
  ]),
  createData('ORD002', 'Jane Smith', 'CUST002', 'Shipped', [
    { name: 'Product C', price: 15, quantity: 1, confirmedQuantity: 1, status: 'Ready' },
    { name: 'Product D', price: 25, quantity: 2, confirmedQuantity: 1, status: 'In progress' },
  ]),
  // Add more orders as needed
];

export default function OrderTable() {
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
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <Row key={order.orderId} row={order} onDelete={handleDelete} onUpdate={handleUpdate} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}