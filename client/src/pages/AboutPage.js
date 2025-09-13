import React from 'react';
import { FiAward, FiUsers, FiGlobe, FiHeart } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Perfume Shop</h1>
            <p>
              Crafting olfactory experiences since 1985, we are passionate curators 
              of the world's finest fragrances, bringing you timeless elegance and 
              modern sophistication in every bottle.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded by master perfumer Isabella Laurent in the heart of Paris, 
                Perfume Shop began as a small boutique dedicated to discovering and 
                sharing the most exquisite fragrances from around the world.
              </p>
              <p>
                What started as a passion project has grown into a globally recognized 
                destination for fragrance enthusiasts, celebrities, and connoisseurs 
                who appreciate the artistry and craftsmanship behind every scent.
              </p>
              <p>
                Today, we continue to honor our founder's vision by carefully curating 
                collections that tell stories, evoke emotions, and create lasting memories 
                through the power of fragrance.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop" 
                alt="Perfume bottles in elegant display"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="text-center">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FiAward size={48} />
              </div>
              <h3>Excellence</h3>
              <p>
                We source only authentic, premium fragrances from renowned perfume 
                houses and emerging artisan creators worldwide.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FiUsers size={48} />
              </div>
              <h3>Expertise</h3>
              <p>
                Our team of fragrance experts and certified perfumers guide you 
                to discover scents that perfectly match your personality.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FiGlobe size={48} />
              </div>
              <h3>Sustainability</h3>
              <p>
                We partner with brands committed to ethical sourcing and 
                environmentally responsible production practices.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FiHeart size={48} />
              </div>
              <h3>Passion</h3>
              <p>
                Every fragrance in our collection is chosen with love and 
                deep appreciation for the art of perfumery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section section">
        <div className="container">
          <h2 className="text-center">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" 
                  alt="Isabella Laurent"
                />
              </div>
              <h3>Isabella Laurent</h3>
              <p className="member-role">Founder & Master Perfumer</p>
              <p>
                With over 30 years in the fragrance industry, Isabella's nose 
                has discovered some of the most beloved scents of our time.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                  alt="Marcus Chen"
                />
              </div>
              <h3>Marcus Chen</h3>
              <p className="member-role">Head of Curation</p>
              <p>
                Marcus travels the world to discover emerging perfumers and 
                exclusive fragrances for our discerning clientele.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" 
                  alt="Sophie Martinez"
                />
              </div>
              <h3>Sophie Martinez</h3>
              <p className="member-role">Fragrance Consultant</p>
              <p>
                Sophie's expertise helps customers find their perfect scent 
                through personalized consultations and fragrance profiling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="awards-section">
        <div className="container">
          <h2 className="text-center">Recognition & Awards</h2>
          <div className="awards-grid">
            <div className="award-item">
              <h4>2023</h4>
              <p>Best Luxury Fragrance Retailer - International Perfume Awards</p>
            </div>
            <div className="award-item">
              <h4>2022</h4>
              <p>Excellence in Customer Service - Retail Excellence Awards</p>
            </div>
            <div className="award-item">
              <h4>2021</h4>
              <p>Sustainable Business of the Year - Green Retail Initiative</p>
            </div>
            <div className="award-item">
              <h4>2020</h4>
              <p>Innovation in E-commerce - Digital Commerce Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;