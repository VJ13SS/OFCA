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
    
        <div className="links">
          
          <span className="icon" style={{color:'blue',marginLeft:'10px'}}><FaFacebook /></span>
          <span className="icon" style={{color:'red'}}><FaInstagram /></span>
          <span className="icon" style={{color:'red'}}><FaYoutube /></span>
        </div>
      </div>
      <span style={{color:'gray',fontSize:'10px'}}>Created by VJ 13 SS</span>
    </div>
  );
}
