import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Access cartItems från location state

  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    address: '', 
    email: '',
    phone: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      const formattedCartItems = cartItems.map(item => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));
  
      console.log('Formatted cart items:', formattedCartItems); // Log formatted cart items
  
      const response = await axios.post('https://hakimslivs-backend.onrender.com/api/orders/neworder', {
        guest: {
          guestFirstName: formData.customerFirstName,
          guestLastName: formData.customerLastName,
          guestEmail: formData.email,
          guestAddress: formData.address,
          guestPhone: formData.phone
        },
        products: formattedCartItems
      });
  
      console.log('Order created:', response.data); // Log response data
      setConfirmationMessage('Din order har blivit placerad!');
      setFormData({
        customerFirstName: '',
        customerLastName: '',
        address: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error creating order:', error); // Log error message
      setErrorMessage('Ett fel har inskett, vänligen försök igen.');
    }
  };
  

  return (
    <div className="container">
      <h2 className="text-center mt-4">Leveransinformation</h2>
      {confirmationMessage && <div className="alert alert-success">{confirmationMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mt-4">
              <label>Förnamn:</label>
              <input
                type="text"
                className="form-control"
                name="customerFirstName"
                value={formData.customerFirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label>Efternamn:</label>
              <input
                type="text"
                className="form-control"
                name="customerLastName"
                value={formData.customerLastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label>Adress:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mt-4">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label>Telefonnummer:</label>
              <input
                type="number"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-secondary mb-5 me-4" onClick={() => navigate('/betalning')}>Gå tillbaka</button>
          <button type="button" className="btn btn-primary mb-5" onClick={handleSubmit}>Bekräfta Order</button>
        </div>
      </form>
    </div>
  );
};

export default Confirmation;
