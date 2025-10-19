import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message
    alert("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions about our services? We're here to help. Reach out to us
          through any of the channels below.
        </p>
      </section>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-method">
            <h3>
              <span>📍</span> Our Location
            </h3>
            <p>ABC Street</p>
            <p>Sindh karachi</p>
            <p>Pakistan</p>
          </div>

          <div className="contact-method">
            <h3>
              <span>📞</span> Phone
            </h3>
            <p>Main: (555) 123-4567</p>
            <p>Support: (555) 987-6543</p>
          </div>

          <div className="contact-method">
            <h3>
              <span>📧</span> Email
            </h3>
            <p>info@healthmate.com</p>
            <p>support@healthmate.com</p>
          </div>

          <div className="office-hours">
            <h3>Office Hours</h3>
            <ul className="hours-list">
              <li>
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          <div className="contact-method">
            <h3>
              <span>🌐</span> Social Media
            </h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                f
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                t
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                in
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                ig
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Message subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
