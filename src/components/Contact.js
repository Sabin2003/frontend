import React, { useState } from 'react';
import './Contact.css';
import Header from './Header';
import Footer from './Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to your backend
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: 'general',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      <Header />
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Have questions about our Cameroonian languages translation service? We're here to help!</p>
      </section>

      {/* Contact Container */}
      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h3>Our Location</h3>
              <p>123 Translation Avenue, Yaoundé, Cameroon</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-content">
              <h3>Phone Number</h3>
              <p>+237 123 456 789</p>
              <p>+237 987 654 321</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <h3>Email Address</h3>
              <p>info@camtranslate.com</p>
              <p>support@camtranslate.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">🕒</div>
            <div className="info-content">
              <h3>Working Hours</h3>
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" class="fa fa-facebook"></a>
            <a href="https://twitter.com" class="fa fa-twitter"></a>
            <a href="https://instagram.com" class="fa fa-instagram"></a>
            <a href="https://linkedin.com" class="fa fa-linkedin"></a>
            <a href="https://whatsapp.com" class="fa fa-whatsapp"></a>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          
          {formSubmitted && (
            <div className="success-message">
              Thank you for your message! We will get back to you soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="suggestion">Suggestion</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;