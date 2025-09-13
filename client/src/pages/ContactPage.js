import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter, FiSend } from 'react-icons/fi';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                Whether you need help finding the perfect fragrance, have questions about 
                our products, or want to share feedback, we're here to help.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiMapPin size={24} />
                  </div>
                  <div className="contact-text">
                    <h4>Visit Our Store</h4>
                    <p>123 Fragrance Street<br />Perfume City, PC 12345<br />United States</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FiPhone size={24} />
                  </div>
                  <div className="contact-text">
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567<br />Toll-free: 1-800-PERFUME</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FiMail size={24} />
                  </div>
                  <div className="contact-text">
                    <h4>Email Us</h4>
                    <p>hello@perfumeshop.com<br />support@perfumeshop.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FiClock size={24} />
                  </div>
                  <div className="contact-text">
                    <h4>Business Hours</h4>
                    <p>
                      Monday - Friday: 9:00 AM - 8:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: 12:00 PM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <FiFacebook size={24} />
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <FiInstagram size={24} />
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <FiTwitter size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  <FiSend size={20} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="fragrance-consultation">Fragrance Consultation</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="text-center">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How do I choose the right fragrance?</h4>
              <p>
                Our fragrance experts recommend testing scents on your skin and 
                allowing them to develop for at least 30 minutes. We also offer 
                personalized consultations to help you find your perfect match.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you offer samples?</h4>
              <p>
                Yes! We provide sample vials for most of our fragrances. You can 
                request samples when placing an order or visit our store for 
                in-person testing.
              </p>
            </div>

            <div className="faq-item">
              <h4>What is your return policy?</h4>
              <p>
                We offer a 30-day return policy for unopened items. For opened 
                fragrances, we accept returns within 14 days if you're not 
                completely satisfied.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you ship internationally?</h4>
              <p>
                Yes, we ship to over 50 countries worldwide. Shipping costs and 
                delivery times vary by location. Please check our shipping page 
                for detailed information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;