import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = ({ clearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    address: '', 
    email: '',
    phone: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedCartItems = cartItems.map(item => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));
  
      await axios.post('https://hakimslivs-backend.onrender.com/api/orders/neworder', {
        guest: {
          guestFirstName: formData.customerFirstName,
          guestLastName: formData.customerLastName,
          guestEmail: formData.email,
          guestAddress: formData.address,
          guestPhone: formData.phone
        },
        products: formattedCartItems
      });
  
      setConfirmationMessage('Din order har blivit placerad!');
      setShowModal(true);
      clearCart();
      setFormData({
        customerFirstName: formData.customerFirstName,
        customerLastName: formData.customerLastName,
        address: formData.address,
        email: formData.email,
        phone: formData.phone
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('Ett fel har inskett, vänligen försök igen.');
    }
  };
  
  
  const closeModal = () => {
    setShowModal(false);
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
          <button type="submit" className="btn btn-primary mb-5">Bekräfta Order</button>
        </div>
      </form>
      {showModal && <Modal formData={formData} cartItems={cartItems} closeModal={closeModal} />}
    </div>
  );
};

const Modal = ({ formData, cartItems, closeModal }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tack för din order!</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <h4>Orderinformation:</h4>
            <h6><strong>Kundinformation:</strong></h6>
            <p>Förnamn: {formData.customerFirstName}</p>
            <p>Efternamn: {formData.customerLastName}</p>
            <p>Adress: {formData.address}</p>
            <p>Email: {formData.email}</p>
            <p>Telefonnummer: {formData.phone}</p>

            <h6><strong>Produkter:</strong></h6>
            <ul>
              {cartItems.map(item => (
                <li key={item._id}>
                  <p>{item.title} - Antal: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
