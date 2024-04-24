import React, { useState, useEffect } from 'react';
import Categories from '../components/CategoriesLeft';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';

const Home = ({ searchQuery, addToCart, setShowCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState('');
  // const [initialLoad, setInitialLoad] = useState(true);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null); // State to hold clicked category
  const [currentPage, setCurrentPage] = useState(1);
  // const [query, setQuery] = useState('');
  const productsPerPage = 8;

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
      setCategoryTitle(category); // Update category title
      // setInitialLoad(false);
      setClickedCategory(category); // Update clicked category
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
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  
    // Update category title based on search query, filtered products, and selected category
    if (searchQuery.trim() === '') {
      setCategoryTitle(clickedCategory ? clickedCategory : 'Alla Produkter'); // If a category is clicked, set the title to the clicked category
    } else if (filteredProducts.length === 0) {
      setCategoryTitle('Inga sökresultat hittades');
    } else {
      setCategoryTitle('Sökresultat');
    }

    // Check if the searched product is in the filtered products array
    const searchedProductIndex = filteredProducts.findIndex((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If the searched product is found, calculate its page and set the current page accordingly
    if (searchedProductIndex !== -1) {
      const page = Math.ceil((searchedProductIndex + 1) / productsPerPage);
      setCurrentPage(page);
    } else {
      // If the searched product is not found, reset to the first page
      setCurrentPage(1);
    }
  }, [searchQuery, products, clickedCategory]);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // const handleSearch = (newQuery) => {
  //   // setQuery(newQuery);
  //   setCurrentPage(1); 
  // };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home">
      <div className="category-section">
        <Categories fetchProductsByCategory={fetchProductsByCategory} setProducts={setProducts} setCategoryTitle={setCategoryTitle} setClickedCategory={setClickedCategory} /> {/* Pass setClickedCategory to Categories component */}
      </div>
      <div className="product-section">
        <div className="d-flex flex-wrap justify-content-center p-4">
          <div className="col-12 text-center">
            <h3 className='gradient_text'>{categoryTitle}</h3> {/* Display dynamic category title */}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
          {currentProducts.map((product, index) => (
            <div key={index} className="col mb-4" onClick={() => handleProductClick(product)} style={{ width: '240px' }}>
              <div className="card h-100 shadow">
                <img src={product.imageUrl} className="card-img-top img-fluid mt-3" alt={product.title} style={{ objectFit: 'contain', maxHeight: '200px', maxWidth: '100%' }} />
                <div className="card-body d-flex flex-column align-items-center" style={{ minHeight: '200px' }}>
                  <div className="mt-auto">
                    <h5 className="card-title fs-5 product-title text-center">{product.title}</h5>
                    <h6 className="card-text fs-6 text-muted mb-2 text-center">{product.brand}</h6>
                    <p className="card-text fs-6 mb-2 text-center">Pris: {product.price} kr</p>
                    <p className="card-text fs-6 mb-2 text-center">Jämförpris: {product.unit_price} kr per {product.unit}</p>
                    <p className="card-text fs-6 mb-2 text-center">Vikt: {formatWeight(product.weight)}</p>
                    <button onClick={(event) => handleAddToCart(event, product)} className="btn btn-primary w-100 text-center">Lägg till i varukorg</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {currentProducts.length < productsPerPage && Array(productsPerPage - currentProducts.length).fill().map((_, index) => (
            <div key={`placeholder-${index}`} className="d-inline-block m-2" style={{ width: '240px' }}>
              <div className="card product-card invisible">
                {/* Placeholder content */}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          {totalPages > 1 && (
            <div>
              <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1}>Föregående</Button>{' '}
              <Button variant="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>Nästa</Button>
            </div>
          )}
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
              <p><strong>Pris:</strong> {selectedProduct.price} kr</p>
              <p><strong>Jämförpris:</strong> {selectedProduct.unit_price} kr per {selectedProduct.unit}</p>
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
