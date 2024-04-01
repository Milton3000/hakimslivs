import React from 'react';


// TESTAR BARA, VET EJ OM DENNA KOMPONENT BEHÖVS.
// Kan förmodligen köra igenom arrayen av produkter för kategorin, men vet ej vad som blir bäst.

const CategoryList = () => {

  const categories = ['Mejeri', 'Frukt', 'Grönsaker', 'Chark', 'Torrvaror', 'Dryck', 'Snacks & Godis'];

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
