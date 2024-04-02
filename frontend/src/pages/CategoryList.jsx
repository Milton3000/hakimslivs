import React, { useState } from 'react';

const CategoryList = () => {
  const categories = ['Mejeri', 'Frukt', 'Grönsaker', 'Chark', 'Torrvaror', 'Dryck', 'Snacks & Godis'];
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">
        <div className="col-md-1"> {/* Adjust the width here */}
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
                      <ul className="list-group">
                        <li className="list-group-item"><a href="#">{category} 1</a></li>
                        <li className="list-group-item"><a href="#">{category} 2</a></li>
                        <li className="list-group-item"><a href="#">{category} 3</a></li>
                      </ul>
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
