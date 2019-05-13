import React from 'react';
import './footer.css';

const Footer = () =>
  <footer className="footer mt-auto py-3">
    <div className="container">
      <span className="text-muted">Copyright &copy; Chukwumaijem 2017 - {new Date().getFullYear()}</span>
    </div>
  </footer>
export default Footer;
