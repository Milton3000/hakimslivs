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
  const [newProductPrice, setNewProductPrice] = React.useState('');

  const handleAddProduct = () => {
    const newProduct = { name: newProductName, price: parseFloat(newProductPrice) };
    const updatedProducts = [...row.products, newProduct];
    onUpdate({ ...row, products: updatedProducts });
    setNewProductName('');
    setNewProductPrice('');
  };

  const handleEditProduct = (index) => {
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
        <tr>
          <td colSpan={6}>
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                Products
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {row.products.map((product, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{editingProductIndex === index ? <input type="text" value={product.name} onChange={(e) => handleUpdateProduct(index, { ...product, name: e.target.value })} /> : product.name}</td>
                        <td>{editingProductIndex === index ? <input type="number" value={product.price} onChange={(e) => handleUpdateProduct(index, { ...product, price: parseFloat(e.target.value) })} /> : product.price}</td>
                        <td>
                          {editingProductIndex === index ? (
                            <IconButton aria-label="done" onClick={() => handleUpdateProduct(index, product)}>
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
                      {editingProductIndex === index && (
                        <tr>
                          <td colSpan={3}>
                            <IconButton aria-label="add" onClick={handleAddProduct}>
                              <AddIcon />
                            </IconButton>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </td>
        </tr>
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
      })
    ).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const orders = [
  createData('ORD001', 'John Doe', 'CUST001', 'Pending', [
    { name: 'Product A', price: 10 },
    { name: 'Product B', price: 20 },
  ]),
  createData('ORD002', 'Jane Smith', 'CUST002', 'Shipped', [
    { name: 'Product C', price: 15 },
    { name: 'Product D', price: 25 },
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
