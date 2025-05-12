import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 MboaTranslate - Web-Based Translation for Low-Resource Cameroonian Languages</p>
        <p>Powered by Hugging Face Transformers</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Research Paper</a>
          <a href="#">API Documentation</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;