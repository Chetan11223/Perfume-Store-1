import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchFeaturedProducts } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        setError('Failed to load featured products');
        console.error('Error loading featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Discover Your Signature Scent</h1>
            <p>
              Explore our curated collection of luxury fragrances from the world's most prestigious brands. 
              From timeless classics to modern masterpieces, find the perfect scent that tells your story.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop Collection
              </Link>
              <Link to="/collections" className="btn btn-outline">
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Featured Fragrances</h2>
            <p>Handpicked selections from our premium collection</p>
          </div>

          {loading ? (
            <div className="grid grid-3">
              {[...Array(6)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No featured products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-3 fade-in">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/products" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>New Collection Launch</h2>
              <p>
                Be the first to experience our exclusive new arrivals. 
                Limited edition fragrances crafted by master perfumers.
              </p>
              <Link to="/products?new=true" className="btn btn-primary">
                Discover New Arrivals
              </Link>
            </div>
            <div className="cta-image">
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop" 
                alt="New perfume collection"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="grid grid-3">
            <div className="feature-card text-center">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Premium Quality</h3>
              <p>Authentic fragrances from renowned perfume houses worldwide</p>
            </div>
            
            <div className="feature-card text-center">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Expert Curation</h3>
              <p>Carefully selected by fragrance experts and perfume connoisseurs</p>
            </div>
            
            <div className="feature-card text-center">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Quick and secure shipping with elegant packaging</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;