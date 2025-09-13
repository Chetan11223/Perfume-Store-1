import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import './CartPage.css';

const CartPage = () => {
  // Mock cart data - in a real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chanel No. 5 Eau de Parfum",
      brand: "Chanel",
      size: "50ml",
      price: 165,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Tom Ford Black Orchid",
      brand: "Tom Ford",
      size: "30ml",
      price: 145,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <FiShoppingBag size={64} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any fragrances to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <FiArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-size">Size: {item.size}</p>
                  <p className="item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            
            <div className="summary-line">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            <div className="summary-line total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {shipping > 0 && (
              <div className="shipping-notice">
                <p>Add {formatPrice(100 - subtotal)} more for free shipping!</p>
              </div>
            )}

            <button className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </button>

            <div className="payment-methods">
              <p>We accept:</p>
              <div className="payment-icons">
                <span>💳</span>
                <span>🏦</span>
                <span>📱</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="cart-recommendations">
          <h3>You might also like</h3>
          <div className="recommendations-grid">
            <div className="recommendation-item">
              <img 
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=200&fit=crop" 
                alt="Dior Sauvage"
              />
              <h4>Dior Sauvage</h4>
              <p>{formatPrice(98)}</p>
              <button className="btn btn-outline btn-sm">Add to Cart</button>
            </div>
            
            <div className="recommendation-item">
              <img 
                src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop" 
                alt="YSL Black Opium"
              />
              <h4>YSL Black Opium</h4>
              <p>{formatPrice(110)}</p>
              <button className="btn btn-outline btn-sm">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;