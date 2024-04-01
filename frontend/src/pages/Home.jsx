import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Correct Route
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="category-section">
        <CategoryList />
      </div>
      <div className="product-section">
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <div>
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price} SEK</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

