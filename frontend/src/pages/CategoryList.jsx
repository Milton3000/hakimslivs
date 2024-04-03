import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const CategoryList = () => {
  const categories = ['Mejeri', 'Frukt', 'Grönsaker', 'Chark', 'Torrvaror', 'Dryck', 'Snacks & Godis'];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setError('');

      // Fetch products based on selected category
      axios.get(`/api/products/category/${selectedCategory}`)
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setError('Error fetching products. Please try again later.');
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">
        <div className="col-md-2"> {/* Bredd */}
          <div className="accordion accordion-flush" id="categoryAccordion">
            {categories.map((category, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className={`accordion-button ${selectedCategory === category ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </h2>
                {selectedCategory === category && (
                  <div id={`collapse${index}`} className="accordion-collapse collapse show" aria-labelledby={`heading${index}`}>
                    <div className="accordion-body">
                      {loading && <p>Loading...</p>}
                      {error && <p>{error}</p>}
                      {!loading && !error && products.length === 0 && <p>No products available for this category.</p>}
                      {!loading && !error && products.length > 0 && (
                        <ul className="list-group">
                          {products.map((product, productIndex) => (
                            <li className="list-group-item" key={productIndex}>
                              <a href="#">{product.title}</a> {/* Display product title or any other relevant information */}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
