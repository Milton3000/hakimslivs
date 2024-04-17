import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddProductModal({ open, onClose, onSave }) {
  const [productName, setProductName] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState('');

  const handleSave = () => {
    const newProduct = { name: productName, quantity: parseFloat(productQuantity) };
    onSave(newProduct);
    onClose();
    setProductName('');
    setProductQuantity('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lägg till produkt</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Sök på produktnamn eller ID"
          type="text"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
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
