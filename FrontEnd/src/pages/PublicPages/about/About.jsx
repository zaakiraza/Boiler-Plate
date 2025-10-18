import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About HealthMate</h1>
        <p>
          We're on a mission to revolutionize family healthcare management through
          technology and innovation. Our platform helps families stay organized,
          informed, and proactive about their health.
        </p>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At HealthMate, we believe that managing family health should be simple,
            intuitive, and efficient. We're dedicated to providing families with the
            tools they need to make informed healthcare decisions and maintain
            better health records.
          </p>
          <p>
            Our AI-powered platform helps you understand medical documents,
            track health patterns, and keep all your family's health information
            organized in one secure place.
          </p>
        </div>
        <div className="mission-image">
          <img
            src="https://img.freepik.com/free-vector/family-doctor-abstract-concept-vector-illustration_107173-24225.jpg"
            alt="Our Mission"
          />
        </div>
      </section>

      <section className="values-section">
        <div className="section-title">
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>
              We prioritize the security and confidentiality of your family's
              health information above everything else.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>
              We continuously evolve our platform with the latest technology to
              provide you with the best healthcare management experience.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Family-Centric</h3>
            <p>
              Every feature we develop is designed with families in mind, making
              health management easier for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>Meet the people making family healthcare management better</p>
        </div>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Team Member"
            />
            <h3>Dr. John Smith</h3>
            <p>Medical Director</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Team Member"
            />
            <h3>Sarah Johnson</h3>
            <p>Technology Lead</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/2.jpg"
              alt="Team Member"
            />
            <h3>Michael Chen</h3>
            <p>AI Specialist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;