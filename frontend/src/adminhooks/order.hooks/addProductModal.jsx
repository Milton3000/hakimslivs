import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddProductModal({ open, onClose, onSave }) {
  const [productName, setProductName] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productName) {
      getProduct();
    }
  }, [productName]);

  async function getProduct() {
    try {
      const response = await axios.get(`http://localhost:3001/api/products?name=${productName}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSave = () => {
    const newProduct = { name: productId, quantity: parseFloat(productQuantity) };
    onSave(newProduct);
    onClose();
    setProductName('');
    setProductQuantity('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lägg till produkt</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onInputChange={(event, newInputValue) => {
            setProductName(newInputValue);
          }}
          onChange={(event, newValue) => {
            setProductName(newValue ? newValue.title : '');
            setProductId(newValue ? newValue._id : '');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              margin="dense"
              id="name"
              label="Sök på produktnamn"
              type="text"
              inputProps={{
                ...params.inputProps,
                style: { width: "20rem" }, // Increase fontSize and height
              }}
            />
          )}
        />
        <TextField
          margin="dense"
          id="quantity"
          label="Antal"
          type="number"
          fullWidth
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Stäng</Button>
        <Button onClick={handleSave}>Lägg till</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductModal;
