// Cart.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Cart = ({ cartItems, handleClose, removeFromCart, showCart, updateQuantity }) => {
  return (
    <div className={`cart-container ${showCart ? 'show' : ''}`}>
      <Modal show={true} onHide={handleClose} size="md">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title>Din Varukorg</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <p>{item.title}</p>
                  <p>Pris: {item.price} SEK</p>
                  <div>
                    <Button variant="secondary" onClick={() => updateQuantity(item, -1)}>-</Button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <Button variant="secondary" onClick={() => updateQuantity(item, 1)}>+</Button>
                  </div>
                  <Button variant="danger" onClick={() => removeFromCart(item)}>Ta bort</Button>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Stäng</Button>
              {/* Add checkout button and functionality if needed */}
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
