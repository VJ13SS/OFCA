import "./Footer.css";
import {FaEnvelope,FaFacebook,FaInstagram,FaYoutube} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-section-1">
        <span>MY ACCOUNT</span>
        <li>
          <a href="/purchase-history">My Orders</a>
        </li>
      </div>
      <div className="footer-section-2">
        <span>CONTACT US</span>
        <span className="email">plyonsfit@gmail.com</span>
      </div>
      <div className="footer-section-3">
        <div className="news-letter">
          <span>NEWS LETTER</span>
          <div className="form">
            <input type="email" placeholder="Enter Your Email..." />
            <button><FaEnvelope /></button>
          </div>
        </div>
        <div className="links">
          <span>FOLLOW US </span>
          <span className="icon" style={{color:'blue',marginLeft:'10px'}}><FaFacebook /></span>
          <span className="icon" style={{color:'red'}}><FaInstagram /></span>
          <span className="icon" style={{color:'red'}}><FaYoutube /></span>
        </div>
      </div>
    </div>
  );
}
