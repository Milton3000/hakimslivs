import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Payment = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    total += 45;
    setTotalPrice(parseFloat(total.toFixed(2))); // Round to two decimal places
  }, [cartItems]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleFinishPurchase = () => {
    // Pass the cartItems to the /confirmation page
    navigate("/confirmation", { state: { cartItems } });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mb-5 mt-2">Kassa</h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-muted font-weight-bold">
              Din varukorg är tom
            </p>
          ) : (
            <div className="row row-cols-2 row-cols-md-3 g-3">
              {cartItems.map((item, index) => (
                <div key={index} className="col">
                  <div className="card h-100 border-0">
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      alt={item.title}
                      style={{ maxHeight: "80px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{item.title}</h6>
                      <p className="card-text">Pris: {item.price} SEK</p>
                      <p className="card-text">Antal: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-center fw-bold">Totalt pris: {totalPrice} SEK</p>
          <p className="text-center"> (Inklusive 45:- leveransavgift) </p>
          <div className="text-center">
            <h5 className="mb-5 mt-5">Faktura skickas i efterhand</h5>
            <div className="mt-4 mb-5 d-flex justify-content-center">
              <button className="btn btn-primary me-2" onClick={handleGoBack}>Gå tillbaka</button>
              <button className="btn btn-primary" onClick={handleFinishPurchase}>Slutför Köp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
