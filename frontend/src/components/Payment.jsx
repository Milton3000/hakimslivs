import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import cardImage from '../../src/images/card.png';
import swishImage from '../../src/images/swish.png';

const Payment = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    // Lägger till leveransavgift
    total += 45;
    setTotalPrice(total);
  }, [cartItems]);
  

  const handlePaymentOptionSelect = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleFinishPurchase = () => {
    // Pass the selectedPaymentOption and cartItems to the /confirmation page
    navigate("/confirmation", { state: { selectedPaymentOption, cartItems } });
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mb-5 mt-2">Din betalning</h2>
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
            <h2 className="mb-5 mt-5">Betalningsalternativ</h2>
            <div className="row justify-content-center">
              <div className="col-md-3 mb-3 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={cardImage}
                    alt="Kort"
                    style={{ height: "40px", width: "auto" }}
                  />
                  <button
                    className={`btn ${selectedPaymentOption === "Kort" ? "btn-primary" : "btn-outline-primary mt-2"}`}
                    onClick={() => handlePaymentOptionSelect("Kort")}
                  >
                    Kort
                  </button>
                </div>
              </div>
              <div className="col-md-3 mb-3 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={swishImage}
                    alt="Swish"
                    style={{ height: "40px", width: "auto" }}
                  />
                  <button
                    className={`btn ${selectedPaymentOption === "Swish" ? "btn-primary" : "btn-outline-primary mt-2"}`}
                    onClick={() => handlePaymentOptionSelect("Swish")}
                  >
                    Swish
                  </button>
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <button
                  className={`btn ${selectedPaymentOption === "Kontant" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handlePaymentOptionSelect("Kontant")}
                  style={{ width: "10%" }}
                >
                  Kontant
                </button>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <button
                  className={`btn ${selectedPaymentOption === "Bankgiro" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handlePaymentOptionSelect("Bankgiro")}
                  style={{ width: "10%" }}
                >
                  Bankgiro
                </button>
              </div>
            </div>
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
