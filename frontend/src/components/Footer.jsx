import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container">
        <div className="row justify-content-center"> 
          <div className="col-md-4">
            <h5 className="mb-4 text-center">Kontakt</h5> 
            <ul className="list-unstyled text-center"> 
              <li><strong>Telefon:</strong> 0123-456789</li>
              <li><strong>Email:</strong> info@hakimlivs.se</li>
              <li><strong>Adress:</strong> Storgatan 123, Stockholm</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-4 text-center">Öppettider</h5>
            <ul className="list-unstyled text-center"> 
              <li><strong>Mån-Fre:</strong> 09:00-18:00</li>
              <li><strong>Lör-Sön:</strong> Stängt</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-4 text-center">Betalsätt</h5> 
            <ul className="list-unstyled text-center"> 
              <li><strong>Bankgiro:</strong> 123-4567</li>
              <li><strong>Swish:</strong> 1234567890</li>
              <li><strong>Kortbetalning:</strong> Visa, Mastercard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-2">
        <p className="mb-0">© Hakim Livs 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
