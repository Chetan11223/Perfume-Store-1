import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import './AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      alert('Login functionality will be implemented with backend authentication');
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login will be implemented with OAuth integration`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          {/* Left Side - Branding */}
          <div className="auth-branding">
            <div className="branding-content">
              <h1>Welcome Back</h1>
              <p>
                Sign in to your account to access your wishlist, track orders, 
                and discover personalized fragrance recommendations.
              </p>
              <div className="branding-features">
                <div className="feature-item">
                  <FiUser className="feature-icon" />
                  <span>Personal Profile</span>
                </div>
                <div className="feature-item">
                  <FiMail className="feature-icon" />
                  <span>Order Tracking</span>
                </div>
                <div className="feature-item">
                  <FiLock className="feature-icon" />
                  <span>Secure Account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="auth-form-container">
            <div className="auth-form-content">
              <div className="auth-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button 
                  className="social-btn google"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <FaGoogle />
                  Continue with Google
                </button>
                <button 
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <FaFacebook />
                  Continue with Facebook
                </button>
                <button 
                  className="social-btn apple"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <FaApple />
                  Continue with Apple
                </button>
              </div>

              <div className="divider">
                <span>or sign in with email</span>
              </div>

              {/* Login Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <FiMail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary auth-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Don't have an account? 
                  <Link to="/signup" className="auth-link"> Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;