import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Managing Your Family's Health Made Simple</h1>
            <p>
              Keep track of your family's health records, medications, and appointments
              all in one secure place. Smart health insights powered by AI to help you
              make better healthcare decisions.
            </p>
            <Link to="/register" className="cta-button">
              Get Started Free
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://img.freepik.com/free-vector/family-doctor-abstract-concept-vector-illustration_107173-24225.jpg"
              alt="Family Healthcare"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-title">
          <h2>Why Choose Our Platform?</h2>
          <p>Everything you need to manage your family's health in one place</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Digital Health Records</h3>
            <p>
              Store and access your family's medical history, prescriptions, and test
              results securely from anywhere.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Analysis</h3>
            <p>
              Get smart insights from your medical documents using advanced AI
              technology to better understand your health.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Appointment Management</h3>
            <p>
              Never miss a doctor's appointment with our smart reminder system and
              calendar integration.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your family's health data is protected with enterprise-grade security
              and encryption.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="section-title">
            <h2>Transform Your Family's Healthcare</h2>
            <p>Experience the benefits of modern health management</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-content">
              <h3>Smart Document Analysis</h3>
              <p>
                Upload any medical document and let our AI analyze it for you.
                Get instant summaries, key findings, and recommendations in simple language.
              </p>
              <Link to="/register" className="cta-button">
                Try it Now
              </Link>
            </div>
            <div className="benefit-image">
              <img
                src="https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg"
                alt="Smart Analysis"
              />
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-image">
              <img
                src="https://img.freepik.com/free-vector/family-visiting-doctor_74855-4488.jpg"
                alt="Family Management"
              />
            </div>
            <div className="benefit-content">
              <h3>Family Member Management</h3>
              <p>
                Add and manage multiple family members, track their health history,
                and keep all important medical information organized and accessible.
              </p>
              <Link to="/register" className="cta-button">
                Start Managing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
