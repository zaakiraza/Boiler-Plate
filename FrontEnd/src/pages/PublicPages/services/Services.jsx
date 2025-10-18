import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-container">
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>
          Comprehensive healthcare management solutions for your entire family.
          From AI-powered document analysis to secure health record storage.
        </p>
      </section>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-image">
            <img
              src="https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7000.jpg"
              alt="AI Analysis"
            />
          </div>
          <div className="service-content">
            <h3>AI Document Analysis</h3>
            <p>
              Upload medical documents and get instant insights using our advanced
              AI technology.
            </p>
            <div className="service-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Quick document scanning</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Automated report summaries</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Key findings highlight</span>
              </div>
            </div>
          </div>
        </div>

        <div className="service-card">
          <div className="service-image">
            <img
              src="https://img.freepik.com/free-vector/health-professional-team_23-2148497394.jpg"
              alt="Family Management"
            />
          </div>
          <div className="service-content">
            <h3>Family Health Management</h3>
            <p>
              Keep track of your entire family's health records, appointments,
              and medications in one place.
            </p>
            <div className="service-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Multiple family profiles</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Health history tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Medication reminders</span>
              </div>
            </div>
          </div>
        </div>

        <div className="service-card">
          <div className="service-image">
            <img
              src="https://img.freepik.com/free-vector/cloud-storage-concept-illustration_114360-7393.jpg"
              alt="Secure Storage"
            />
          </div>
          <div className="service-content">
            <h3>Secure Health Records</h3>
            <p>
              Store and access your family's health records securely from
              anywhere, anytime.
            </p>
            <div className="service-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>End-to-end encryption</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Cloud backup</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Easy document sharing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that's right for your family</p>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">
              Free<span>/month</span>
            </div>
            <ul className="features-list">
              <li>1 Family Member</li>
              <li>Basic Document Storage</li>
              <li>Limited AI Analysis</li>
              <li>Email Support</li>
            </ul>
            <Link to="/register" className="cta-button">
              Get Started
            </Link>
          </div>

          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Family</h3>
            <div className="price">
              $9.99<span>/month</span>
            </div>
            <ul className="features-list">
              <li>Up to 5 Family Members</li>
              <li>Unlimited Document Storage</li>
              <li>Full AI Analysis</li>
              <li>Priority Support</li>
              <li>Health Insights</li>
            </ul>
            <Link to="/register" className="cta-button">
              Start Free Trial
            </Link>
          </div>

          <div className="pricing-card">
            <h3>Premium</h3>
            <div className="price">
              $19.99<span>/month</span>
            </div>
            <ul className="features-list">
              <li>Unlimited Family Members</li>
              <li>Unlimited Everything</li>
              <li>Advanced AI Features</li>
              <li>24/7 Premium Support</li>
              <li>Custom Health Reports</li>
              <li>API Access</li>
            </ul>
            <Link to="/register" className="cta-button">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;