// Home.jsx
import React, { useState, useEffect } from 'react';
import Categories from '../components/CategoriesLeft';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';

const Home = ({ searchQuery, addToCart, setShowCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState('POPULÄRT JUST NU');
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
      setCategoryTitle(category); // Update category title
      setInitialLoad(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
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
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProducts(filteredProducts);
  
    if (searchQuery.trim() !== '') {
      setCategoryTitle('Sökresultat');
    } else if (filteredProducts.length === 0) {
      setCategoryTitle('POPULÄRT JUST NU');
    } else {
      setCategoryTitle(categoryTitle); // Keep the current category title if not searching or if there are filtered products
    }
  }, [searchQuery, products, categoryTitle]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDescriptionModal(true); // Show product description modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return (weight / 1000).toFixed(1) + " kg"; 
    } else if (weight >= 1) {
      return weight + " g"; 
    } else {
      return (weight * 1000).toFixed(1) + " g"; 
    }
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); 
    addToCart(product);
    setShowDescriptionModal(false); 
    setShowCart(false); 
  };

  return (
    <div className="home">
      <div className="category-section">
      <Categories fetchProductsByCategory={fetchProductsByCategory} setProducts={setProducts} setCategoryTitle={setCategoryTitle} />
      </div>
      <div className="product-section">
        <div className="d-flex flex-wrap justify-content-center p-4">
          <div className="col-12 text-center">
            <h3 className='gradient_text'>{categoryTitle}</h3> {/* Display dynamic category title */}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
          {filteredProducts.slice(0, initialLoad ? 8 : undefined).map((product, index) => (
            <div key={index} className="col mb-4" onClick={() => handleProductClick(product)} style={{ width: '240px' }}>
              <div className="card h-100 shadow">
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3" alt={product.title} style={{ objectFit: 'contain', maxHeight: '200px', maxWidth: '100%' }} />
                <div className="card-body d-flex flex-column align-items-center" style={{ minHeight: '200px' }}>
                  <div className="mt-auto">
                    <h5 className="card-title fs-5 product-title text-center">{product.title}</h5>
                    <h6 className="card-text fs-6 text-muted mb-2 text-center">{product.brand}</h6>
                    <p className="card-text fs-6 mb-2 text-center">Pris: {product.price} SEK</p>
                    <p className="card-text fs-6 mb-2 text-center">Jämförpris: {product.unit_price} SEK per {product.unit}</p>
                    <p className="card-text fs-6 mb-2 text-center">Vikt: {formatWeight(product.weight)}</p>
                    <button onClick={(event) => handleAddToCart(event, product)} className="btn btn-primary w-100 text-center">Lägg till i varukorg</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length < 4 && Array(4 - filteredProducts.length).fill().map((_, index) => (
            <div key={`placeholder-${index}`} className="d-inline-block m-2" style={{ width: '240px' }}>
              <div className="card product-card invisible">
                {/* Lägg till mer placeholder content här om behövs */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal show={showDescriptionModal} onHide={handleCloseModal} size="md" centered>
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="text-center">{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            <div className="text-center">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="img-fluid shadow" style={{ maxHeight: '350px', borderRadius: '10px' }} />
            </div>
            <div className="mt-4">
              <p><strong>Namn:</strong> {selectedProduct.title}</p>
              <p><strong>Pris:</strong> {selectedProduct.price} SEK</p>
              <p><strong>Jämförpris:</strong> {selectedProduct.unit_price} SEK per {selectedProduct.unit}</p>
              <p><strong>Vikt:</strong> {formatWeight(selectedProduct.weight)}</p>
              <p><strong>Beskrivning:</strong> {selectedProduct.description}</p>
              <p><strong>Varumärke:</strong> {selectedProduct.brand}</p>
              <p><strong>Land:</strong> {selectedProduct.origin}</p>
              <p><strong>Innehållsförteckning:</strong> {selectedProduct.TOC.join(', ')}</p>
            </div>
            <div className="text-center mt-4">
              <Button variant="primary" onClick={handleCloseModal}>Stäng</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Home;
