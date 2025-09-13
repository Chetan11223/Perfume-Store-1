import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchProducts } from '../services/api';
import './CollectionsPage.css';

const CollectionsPage = () => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCollection, setActiveCollection] = useState('featured');

  const collectionTypes = [
    {
      id: 'featured',
      name: 'Featured Collection',
      description: 'Our handpicked selection of premium fragrances',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop'
    },
    {
      id: 'new-arrivals',
      name: 'New Arrivals',
      description: 'Latest additions to our fragrance library',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=400&fit=crop'
    },
    {
      id: 'luxury',
      name: 'Luxury Collection',
      description: 'Exclusive high-end fragrances for connoisseurs',
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=600&h=400&fit=crop'
    },
    {
      id: 'bestsellers',
      name: 'Best Sellers',
      description: 'Most popular fragrances loved by our customers',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load different collections
      const [featured, newArrivals, luxury, bestsellers] = await Promise.all([
        fetchProducts({ featured: 'true', limit: 6 }),
        fetchProducts({ limit: 6 }), // Simulate new arrivals
        fetchProducts({ minPrice: 200, limit: 6 }), // Luxury (high price)
        fetchProducts({ limit: 6 }) // Bestsellers (same as general for demo)
      ]);

      setCollections({
        featured: featured.products,
        'new-arrivals': newArrivals.products.slice(0, 6),
        luxury: luxury.products,
        bestsellers: bestsellers.products.slice(0, 6)
      });
    } catch (err) {
      setError('Failed to load collections');
      console.error('Error loading collections:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentCollection = collectionTypes.find(c => c.id === activeCollection);
  const currentProducts = collections[activeCollection] || [];

  return (
    <div className="collections-page">
      {/* Hero Section */}
      <section className="collections-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our Collections</h1>
            <p>
              Discover curated selections of the world's finest fragrances, 
              organized by theme, occasion, and preference.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Navigation */}
      <section className="collection-nav">
        <div className="container">
          <div className="nav-tabs">
            {collectionTypes.map((collection) => (
              <button
                key={collection.id}
                className={`nav-tab ${activeCollection === collection.id ? 'active' : ''}`}
                onClick={() => setActiveCollection(collection.id)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Content */}
      <section className="collection-content section">
        <div className="container">
          {currentCollection && (
            <div className="collection-header">
              <div className="collection-info">
                <h2>{currentCollection.name}</h2>
                <p>{currentCollection.description}</p>
              </div>
              <div className="collection-image">
                <img 
                  src={currentCollection.image} 
                  alt={currentCollection.name}
                />
              </div>
            </div>
          )}

          {loading ? (
            <div className="products-grid">
              {[...Array(6)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="error-message">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button 
                onClick={loadCollections} 
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>This collection is currently being updated. Please check back soon.</p>
            </div>
          ) : (
            <div className="products-grid fade-in">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="collection-footer">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Features */}
      <section className="collection-features">
        <div className="container">
          <h2 className="text-center">Why Choose Our Collections?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Expert Curation</h3>
              <p>Each collection is carefully curated by our fragrance experts and master perfumers.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#d4af37" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Authentic Products</h3>
              <p>100% authentic fragrances sourced directly from authorized distributors and brands.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Personal Touch</h3>
              <p>Personalized recommendations based on your preferences and fragrance profile.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#d4af37"/>
                </svg>
              </div>
              <h3>Regular Updates</h3>
              <p>Our collections are regularly updated with new arrivals and seasonal selections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Be the first to know about new collections, exclusive launches, and special offers.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;