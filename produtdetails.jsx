
import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import "./App.css";


function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;


  const mockStock = 34;
  const mockSKU = `ELC-${id}-${product.category.slice(0,3).toUpperCase()}`;
  const mockWeight = '9g';
  const mockTags = [product.category];
  const mockDiscount = '-15% OFF';
  const brand = product.category === 'electronics' ? 'Tech Innovation' : product.category;
  const rating = product.rating ? product.rating.rate : 2.86;
  const ratingCount = product.rating ? product.rating.count : 5;

  return (
    <div className="product-detail-page">
      <div className="product-detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail-info">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-brand">{brand}</div>
        <div className="product-rating">
          <span style={{color:'#ffb400', fontSize:'1.2rem'}}>★</span>
          <span style={{marginLeft:'0.3rem'}}>{rating.toFixed(2)} / 5</span>
          <span style={{marginLeft:'0.5rem', color:'#888'}}>({ratingCount})</span>
        </div>
        <p className="product-desc">{product.description}</p>
        <hr style={{margin:'1.2rem 0'}} />
        <div className="product-price-row">
          <span className="product-price-main">${product.price}</span>
          <span className="product-discount">{mockDiscount}</span>
        </div>
        <div className="product-details-boxes">
          <div className="product-detail-box"><span>Category:</span> <b>{product.category}</b></div>
          <div className="product-detail-box"><span>Stock:</span> <b>{mockStock} available</b></div>
          <div className="product-detail-box"><span>SKU:</span> <b>{mockSKU}</b></div>
          <div className="product-detail-box"><span>Weight:</span> <b>{mockWeight}</b></div>
        </div>
        <div className="product-tags-row">
          {mockTags.map(tag => (
            <span className="product-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <Link to="/" className="back-link">Back to Products</Link>
      </div>
    </div>
  );
}

export default ProductDetail;