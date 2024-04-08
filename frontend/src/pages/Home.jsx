import React, { useState, useEffect } from 'react';
import Categories from './CategoriesLeft';
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

  const handleAddToCartClick = (event, productId) => {
    event.stopPropagation(); // Prevent the modal from opening when "Lägg till i Varukorg" button is clicked
    addToCart(productId);
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
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col" onClick={() => handleProductClick(product)}>
              <div className="card product-card">
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3" alt={product.title} style={{ objectFit: 'contain', maxHeight: '200px', maxWidth: '100%' }} />
                <div className="card-body d-flex flex-column align-items-center" style={{ minHeight: '250px' }}>
                  <h5 className="card-title fs-5 product-title text-center">{product.title}</h5>
                  <h6 className="card-text fs-6 text-muted mb-3 text-center">{product.supplier}</h6>
                  <p className="card-text fs-6 mb-3 product-price text-center">Pris: {product.price} SEK</p>
                  <button onClick={(e) => handleAddToCartClick(e, product.id)} className="btn btn-primary">Lägg till i varukorg</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal show={true} onHide={handleCloseModal} size="md">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="img-fluid mx-auto d-block" style={{ maxHeight: '350px' }} />
            <div className="scrollable-details text-center">
              <p>{selectedProduct.description.length > 100 ? `${selectedProduct.description.substring(0, 100)}...` : selectedProduct.description}</p>
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
