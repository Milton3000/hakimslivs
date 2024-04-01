import React from 'react';


// TESTAR BARA, VET EJ OM DENNA KOMPONENT BEHÖVS.

const CategoryList = () => {

  const categories = ['Mejeri', 'Frukt', 'Grönsaker', 'Kött', 'Bröd'];

  return (
    <div className="category-list">
      <h2>Kategorier</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
