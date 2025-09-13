import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchProducts, fetchScentFamilies } from '../services/api';
import { FiFilter, FiX } from 'react-icons/fi';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scentFamilies, setScentFamilies] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({});
  
  const [filters, setFilters] = useState({
    scentFamily: searchParams.get('scentFamily') || '',
    featured: searchParams.get('featured') === 'true',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'featured'
  });

  useEffect(() => {
    loadScentFamilies();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadScentFamilies = async () => {
    try {
      const families = await fetchScentFamilies();
      setScentFamilies(families);
    } catch (err) {
      console.error('Error loading scent families:', err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (filters.scentFamily) params.scentFamily = filters.scentFamily;
      if (filters.featured) params.featured = 'true';
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.search) params.search = filters.search;
      
      const data = await fetchProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
      
      // Update URL params
      const newSearchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '' && value !== false) {
          newSearchParams.set(key, value.toString());
        }
      });
      setSearchParams(newSearchParams);
      
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      scentFamily: '',
      featured: false,
      minPrice: '',
      maxPrice: '',
      search: '',
      sortBy: 'featured'
    });
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== false && value !== 'featured'
  );

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Our Fragrance Collection</h1>
            <p>Discover premium perfumes from the world's most prestigious brands</p>
          </div>
          
          <div className="header-actions">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter size={20} />
              Filters
              {hasActiveFilters && <span className="filter-badge"></span>}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={`filters ${showFilters ? 'show' : ''}`}>
          <div className="filter-header">
            <h3>Filter Products</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="filter-content">
            <div className="filter-group">
              <label htmlFor="search-input">Search</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search fragrances..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="scent-family-select">Scent Family</label>
              <select
                id="scent-family-select"
                value={filters.scentFamily}
                onChange={(e) => handleFilterChange('scentFamily', e.target.value)}
              >
                <option value="">All Scent Families</option>
                {scentFamilies.map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                />
                Featured Products Only
              </label>
            </div>

            <div className="filter-actions">
              {hasActiveFilters && (
                <button 
                  className="btn btn-secondary"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <div className="results-info">
            {!loading && (
              <span>
                {pagination.total || 0} products found
                {hasActiveFilters && ' (filtered)'}
              </span>
            )}
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-content">
          {loading ? (
            <div className="products-grid">
              {[...Array(12)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="error-message">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button 
                onClick={loadProducts} 
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>
                {hasActiveFilters 
                  ? 'Try adjusting your filters to see more results.'
                  : 'We couldn\'t find any products at the moment.'
                }
              </p>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="products-grid fade-in">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Load More / Pagination */}
        {pagination.pages > 1 && (
          <div className="pagination">
            <p>
              Showing {products.length} of {pagination.total} products
            </p>
            {pagination.page < pagination.pages && (
              <button className="btn btn-outline">
                Load More Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;