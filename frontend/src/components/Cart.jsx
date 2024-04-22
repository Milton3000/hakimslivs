// Cart.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { BsCart3, BsTrash } from "react-icons/bs";

const Cart = ({
  cartItems,
  handleClose,
  removeFromCart,
  showCart,
  updateQuantity,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(parseFloat(total.toFixed(2))); // Round to two decimal places
  }, [cartItems]);
  

  return (
    <div className={`cart-container ${showCart ? "show" : ""}`}>
      <Modal show={true} onHide={handleClose} size="md">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title className="d-flex justify-content-center align-items-center">
                <BsCart3 size={20} className="me-2" /> Din Varukorg
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              {cartItems.length === 0 ? (
                <p className="text-center text-muted font-weight-bold">
                  Din varukorg är tom
                </p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="d-flex align-items-center">
                      <div className="preview-image me-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          style={{ maxWidth: "100px", maxHeight: "80px" }}
                        />
                      </div>
                      <div>
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <p>{item.brand}</p>
                        <p>Pris: {item.price} SEK</p>
                        <div>
                          <Badge
                            pill
                            variant="secondary"
                            className="me-1"
                            onClick={() => updateQuantity(item._id, -1)}
                            style={{ cursor: "pointer" }}
                          >
                            -
                          </Badge>
                          <span style={{ margin: "0 10px" }}>
                            {item.quantity}
                          </span>
                          <Badge
                            pill
                            variant="secondary"
                            className="me-1"
                            onClick={() => updateQuantity(item._id, 1)}
                            style={{ cursor: "pointer" }}
                          >
                            +
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                ))
              )}
            </Modal.Body>

            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" href="/betalning">
                Gå till kassa
              </Button>{" "}
            </Modal.Footer>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontWeight: "bold" }}>Totalt: {totalPrice} SEK</p>{" "}
              {/* Display total price */}
            </Modal.Footer>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
              <p> (exklusive 45:- leveransavgift) </p>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
