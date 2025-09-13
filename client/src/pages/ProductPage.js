import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiShare2, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaWhatsapp, FaCopy } from 'react-icons/fa';
import ReviewSection from '../components/ReviewSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchProductBySlug } from '../services/api';
import './ProductPage.css';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProductBySlug(slug);
        setProduct(productData);
        setSelectedSize(productData.sizes?.[0] || null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="star filled" fill="currentColor" />);
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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = `${product.name} - Perfume Shop`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-loading">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>{error}</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link to="/products" className="back-button">
          <FiArrowLeft size={20} />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="product-details">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]?.url} 
                alt={product.images[selectedImage]?.alt || product.name}
              />
              {product.featured && (
                <div className="product-badge featured">Featured</div>
              )}
              {product.isNew && (
                <div className="product-badge new">New</div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.url} alt={image.alt} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="brand-name">
                <span className="brand">{product.brand}</span>
                <span className="scent-family">{product.scentFamily}</span>
              </div>
              
              <div className="product-actions">
                <button className="action-btn wishlist-btn" aria-label="Add to wishlist">
                  <FiHeart size={20} />
                </button>
                
                <div className="share-container">
                  <button 
                    className="action-btn share-btn"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    aria-label="Share product"
                  >
                    <FiShare2 size={20} />
                  </button>
                  
                  {showShareMenu && (
                    <div className="share-menu">
                      <button onClick={() => handleShare('facebook')}>
                        <FaFacebook /> Facebook
                      </button>
                      <button onClick={() => handleShare('twitter')}>
                        <FaTwitter /> Twitter
                      </button>
                      <button onClick={() => handleShare('whatsapp')}>
                        <FaWhatsapp /> WhatsApp
                      </button>
                      <button onClick={() => handleShare('copy')}>
                        <FaCopy /> Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            {product.rating > 0 && (
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <div className="product-price">
              <span className="current-price">{formatPrice(selectedSize?.price || product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selection">
                <h3>Size</h3>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-option ${selectedSize === size ? 'selected' : ''} ${!size.inStock ? 'out-of-stock' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      disabled={!size.inStock}
                    >
                      <span className="size-volume">{size.volume}</span>
                      <span className="size-price">{formatPrice(size.price)}</span>
                      {!size.inStock && <span className="out-of-stock-label">Out of Stock</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="purchase-section">
              <button 
                className="btn btn-primary add-to-cart"
                disabled={!product.inStock || (selectedSize && !selectedSize.inStock)}
              >
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <div className="product-meta">
                <div className="meta-item">
                  <strong>Scent Family:</strong> {product.scentFamily}
                </div>
                <div className="meta-item">
                  <strong>Brand:</strong> {product.brand}
                </div>
                <div className="meta-item">
                  <strong>Availability:</strong> 
                  <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={product._id} />
      </div>
    </div>
  );
};

export default ProductPage;