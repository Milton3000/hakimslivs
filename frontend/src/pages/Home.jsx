// Home.jsx
import React, { useState, useEffect } from 'react';
import Categories from '../components/CategoriesLeft';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';

const Home = ({ searchQuery, addToCart, setShowCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('POPULÄRT JUST NU');
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
      setCategoryTitle(category);
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
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (searchQuery.trim() !== '') {
      setCategoryTitle('Sökresultat');
    } else {
      setCategoryTitle('POPULÄRT JUST NU');
    }
  }, [searchQuery, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDescriptionModal(true); // Show product description modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowDescriptionModal(false); // Close product description modal
    setShowCart(true); // Show cart modal
  };

  return (
    <div className="home">
      <div className="category-section">
        <Categories fetchProductsByCategory={fetchProductsByCategory} setProducts={setProducts} />
      </div>
      <div className="product-section">
        <div className="d-flex flex-wrap justify-content-center p-4">
          <div className="col-12 text-center">
            <h3 className='gradient_text'>{categoryTitle}</h3>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
          {filteredProducts.slice(0, initialLoad ? 8 : undefined).map((product, index) => (
            <div key={index} className="col mb-4" onClick={() => handleProductClick(product)} style={{ width: '240px' }}>
              <div className="card h-100">
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3" alt={product.title} style={{ objectFit: 'contain', maxHeight: '200px', maxWidth: '100%' }} />
                <div className="card-body d-flex flex-column align-items-center" style={{ minHeight: '200px' }}>
                  <div className="mt-auto">
                    <h5 className="card-title fs-5 product-title text-center">{product.title}</h5>
                    <h6 className="card-text fs-6 text-muted mb-3 text-center">{product.supplier}</h6>
                    <p className="card-text fs-6 mb-3 product-price text-center">Pris: {product.price} SEK</p>
                    <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Lägg till i varukorg</Button>

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
        <Modal show={showDescriptionModal} onHide={handleCloseModal} size="md">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="img-fluid mx-auto d-block" style={{ maxHeight: '350px' }} />
            <div className="scrollable-details text-center">
              <p>
                {showFullDescription
                  ? selectedProduct.description
                  : selectedProduct.description.length > 100
                    ? `${selectedProduct.description.substring(0, 100)}...`
                    : selectedProduct.description}
                {selectedProduct.description.length > 100 && (
                  <button className="btn btn-link" onClick={toggleDescription}>
                    {showFullDescription ? 'Läs mindre' : 'Läs mer'}
                  </button>
                )}
              </p>
              <p>Pris: {selectedProduct.price} SEK</p>
              <Button variant="success" onClick={() => handleAddToCart(selectedProduct)}>Lägg till i varukorg</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Home;