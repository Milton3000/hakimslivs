import React, { useState, useEffect } from 'react';
import Categories from '../components/CategoriesLeft';
import { Modal, Button } from 'react-bootstrap';
import './Home.css'; 

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        // const response = await fetch('/api/products/all'); 
        const response = await fetch('https://hakimslivs-backend.onrender.com/api/products/all'); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const addToCart = (productId) => {
    // Implement addToCart functionality here
    console.log(`Product added to cart: ${productId}`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="home">
      <div className="category-section"> 
        <Categories setProducts={setProducts} />
      </div>
      <div className="product-section">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3 className='gradient_text'>POPULÄRT JUST NU</h3>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-6 g-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col">
              <div className="card h-100 product-card" onClick={() => handleProductClick(product)}>
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3 product-image" alt={product.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fs-5 product-title">{product.title}</h5>
                  <h6 className="card-text fs-6 mb-3">{product.supplier}</h6>
                  <div className="product-description-scroll">
                    <p className="card-text fs-6 mb-3">{product.description}</p>
                  </div>
                  <p className="card-text fs-6 mb-5 product-price">Pris: {product.price} SEK</p>
                  <button onClick={() => addToCart(product.id)} className="btn btn-primary mt-auto">Lägg till i varukorg</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal show={true} onHide={handleCloseModal} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="img-fluid" />
            <div className="scrollable-details">
              <p>{selectedProduct.description}</p>
              <p>Pris: {selectedProduct.price} SEK</p>
              <Button variant="primary" onClick={() => addToCart(selectedProduct.id)}>Lägg till i varukorg</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Home;