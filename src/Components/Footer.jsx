import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white">
      <div className="container">
        <div className="footer-section">
          <h5>IEC</h5>
          <p>Empowering Innovation, Powering Tomorrow: Transforming Ideas into Electronics Excellence.</p>
        </div>
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>Home</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Contact</h5>
          <p>New York, NY 10012, US</p>
          <p>info@gmail.com</p>
          <p>+ 01 234 567 88</p>
          <p>+ 01 234 567 89</p>
        </div>
      </div>
      <div className="social-icons text-center">
        <ul className="social list-inline">
          <li className="list-inline-item"><a href="/"><FaFacebookF /></a></li>
          <li className="list-inline-item"><a href="/"><FaTwitter /></a></li>
          <li className="list-inline-item"><a href="/"><FaGoogle /></a></li>
          <li className="list-inline-item"><a href="/"><FaInstagram /></a></li>
          <li className="list-inline-item"><a href="/"><FaLinkedinIn /></a></li>
          <li className="list-inline-item"><a href="/"><FaGithub /></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
