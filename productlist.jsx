

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./App.css";


function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

 
  return (
    <div>
      <h1>Products</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              {/* Link to the product detail page */}
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
