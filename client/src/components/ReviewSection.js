import React, { useState, useEffect } from 'react';
import { FiStar, FiThumbsUp } from 'react-icons/fi';
import { fetchProductReviews, createReview } from '../services/api';
import './ReviewSection.css';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [ratingStats, setRatingStats] = useState([]);
  
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    loadReviews();
  }, [productId, sortBy]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await fetchProductReviews(productId, { sortBy });
      setReviews(data.reviews);
      setRatingStats(data.ratingStats || []);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.customerName.trim() || !reviewForm.title.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const newReview = await createReview({
        ...reviewForm,
        productId
      });
      
      setReviews(prev => [newReview, ...prev]);
      setReviewForm({
        customerName: '',
        rating: 5,
        title: '',
        comment: ''
      });
      setShowReviewForm(false);
      
      // Reload reviews to get updated stats
      loadReviews();
    } catch (err) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          className={`star ${i <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onRatingChange(i) : undefined}
          disabled={!interactive}
        >
          <FiStar fill={i <= rating ? 'currentColor' : 'none'} />
        </button>
      );
    }
    
    return <div className="stars">{stars}</div>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratingStats.forEach(stat => {
      distribution[stat._id] = stat.count;
    });
    
    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    return { distribution, total };
  };

  const { distribution, total } = getRatingDistribution();
  const averageRating = total > 0 
    ? ratingStats.reduce((sum, stat) => sum + (stat._id * stat.count), 0) / total 
    : 0;

  return (
    <section className="review-section">
      <div className="review-header">
        <h2>Customer Reviews</h2>
        
        {total > 0 && (
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              {renderStars(Math.round(averageRating))}
              <span className="review-count">({total} reviews)</span>
            </div>
            
            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="rating-bar">
                  <span className="rating-label">{rating}</span>
                  <FiStar className="star-icon" />
                  <div className="bar">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: total > 0 ? `${(distribution[rating] / total) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                  <span className="rating-count">({distribution[rating]})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="review-controls">
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
        
        <button 
          className="btn btn-outline"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h3>Write Your Review</h3>
          
          <div className="form-group">
            <label htmlFor="customer-name">Your Name *</label>
            <input
              id="customer-name"
              type="text"
              value={reviewForm.customerName}
              onChange={(e) => setReviewForm(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating *</label>
            {renderStars(reviewForm.rating, true, (rating) => 
              setReviewForm(prev => ({ ...prev, rating }))
            )}
          </div>

          <div className="form-group">
            <label htmlFor="review-title">Review Title *</label>
            <input
              id="review-title"
              type="text"
              value={reviewForm.title}
              onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-comment">Your Review *</label>
            <textarea
              id="review-comment"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your thoughts about this fragrance..."
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {loading ? (
          <div className="loading-reviews">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="review-skeleton">
                <div className="skeleton-header">
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-text short"></div>
                </div>
                <div className="skeleton-text long"></div>
                <div className="skeleton-text medium"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="empty-reviews">
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.customerName}</span>
                  {review.verified && (
                    <span className="verified-badge">Verified Purchase</span>
                  )}
                </div>
                <div className="review-meta">
                  {renderStars(review.rating)}
                  <span className="review-date">{formatDate(review.createdAt)}</span>
                </div>
              </div>
              
              <h4 className="review-title">{review.title}</h4>
              <p className="review-comment">{review.comment}</p>
              
              <div className="review-actions">
                <button className="helpful-btn">
                  <FiThumbsUp size={16} />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;