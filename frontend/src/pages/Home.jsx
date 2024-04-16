import React, { useState, useEffect } from 'react';
import Categories from '../components/CategoriesLeft';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('POPULÄRT JUST NU'); // Initialize with 'POPULÄRT JUST NU'
  const [initialLoad, setInitialLoad] = useState(true); // Track if it's the initial load

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
      setCategoryTitle(category);
      setInitialLoad(false); // Set initial load to false when selecting a category
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
    // Filter products based on search query
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Update category title based on search query
    if (searchQuery.trim() !== '') {
      setCategoryTitle('Sökresultat');
    } else {
      setCategoryTitle('POPULÄRT JUST NU');
    }
  }, [searchQuery, products]);

  const addToCart = (productId) => {
    // Implement addToCart functionality here (Senare)
    console.log(`Product added to cart: ${productId}`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartClick = (event, productId) => {
    event.stopPropagation();
    addToCart(productId);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Convert weight to appropriate unit
  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return (weight / 1000).toFixed(1) + " kg"; // Convert to kilograms
    } else if (weight >= 1) {
      return weight + " g"; // Keep weight in grams
    } else {
      return (weight * 1000).toFixed(1) + " g"; // Convert to grams if less than 1 kg
    }
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
              <div className="card h-100 shadow">
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3" alt={product.title} style={{ objectFit: 'contain', maxHeight: '200px', maxWidth: '100%' }} />
                <div className="card-body d-flex flex-column align-items-center" style={{ minHeight: '200px' }}>
                  <div className="mt-auto">
                    <h5 className="card-title fs-5 product-title text-center">{product.title}</h5>
                    <h6 className="card-text fs-6 text-muted mb-2 text-center">{product.brand}</h6>
                    <p className="card-text fs-6 mb-2 text-center">Pris: {product.price} SEK</p>
                    <p className="card-text fs-6 mb-2 text-center">Jämförpris: {product.unit_price} SEK per {product.unit}</p>

                    <p className="card-text fs-6 mb-2 text-center">Vikt: {formatWeight(product.weight)}</p>
                    <button onClick={(e) => handleAddToCartClick(e, product.id)} className="btn btn-primary w-100 text-center">Lägg till i varukorg</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Add placeholders if there are less than 4 products */}
          {filteredProducts.length < 4 && Array(4 - filteredProducts.length).fill().map((_, index) => (
            <div key={`placeholder-${index}`} className="d-inline-block m-2" style={{ width: '240px' }}>
              <div className="card product-card invisible">
                {/* Add any additional placeholder content here */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal show={true} onHide={handleCloseModal} size="md" centered>
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
