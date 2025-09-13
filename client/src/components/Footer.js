import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Perfume Shop</span>
            </Link>
            <p className="footer-description">
              Discover the world's finest fragrances. From classic elegance to modern sophistication, 
              we curate premium perfumes that tell your unique story.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><a href="/products?scentFamily=Floral">Floral</a></li>
              <li><a href="/products?scentFamily=Oriental">Oriental</a></li>
              <li><a href="/products?scentFamily=Woody">Woody</a></li>
              <li><a href="/products?scentFamily=Fresh">Fresh</a></li>
              <li><a href="/products?scentFamily=Citrus">Citrus</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiMapPin size={16} />
                <span>123 Fragrance Street, Perfume City, PC 12345</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail size={16} />
                <span>hello@perfumeshop.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h4>Stay in the Scent</h4>
            <p>Subscribe to our newsletter for exclusive offers and new fragrance launches.</p>
          </div>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email"
              aria-label="Email address"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Perfume Shop. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;