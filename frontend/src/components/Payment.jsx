import React, { useState, useEffect } from "react";

const Payment = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div>
      <h1>Din betalning</h1>
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
                <p>Antal: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))
      )}
      <p>Totalt pris: {totalPrice} SEK</p>
    </div>
  );
};

export default Payment;
