import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="star" fill="currentColor" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FiStar key={i} className="star half" fill="currentColor" />);
      } else {
        stars.push(<FiStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <img 
          src={product.images[0]?.url} 
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
        />
        {product.featured && (
          <div className="product-badge">Featured</div>
        )}
        {product.isNew && (
          <div className="product-badge new">New</div>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="product-badge sale">Sale</div>
        )}
      </div>
      
      <div className="product-card-content">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>
        
        <div className="product-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        
        {product.rating > 0 && (
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span>({product.reviewCount})</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;