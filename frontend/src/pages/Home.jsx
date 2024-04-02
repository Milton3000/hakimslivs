import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all'); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (productId) => {
// Lägg till funktionaliteten senare här: 
    console.log(`Product added to cart: ${productId}`);
  };

  return (
    <div className="home">
      <div className="category-section"> 
        <CategoryList />
      </div>
      <div className="product-section">
        <h2>Produkter</h2>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4">
                <img src={product.imageUrl} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.supplier} - {product.description}</p>
                  <p className="card-text">Pris: {product.price} SEK</p>
                  <button onClick={() => addToCart(product.id)} className="btn btn-primary">Lägg till i varukorg</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
