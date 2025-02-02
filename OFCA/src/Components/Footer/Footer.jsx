import "./Footer.css";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
//IG: https://www.instagram.com/ofcafitness?igsh=d3dtY2swbHJ5M20=
//FB: https://www.facebook.com/share/15f2XhE4Re/
//LinkedIn: https://www.linkedin.com/in/patrick-a-lyons?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
//YouTube: https://youtube.com/@patricklyonsofficial?si=5Qh4_bhnqPcpPn5D
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
          <span className="icon">
            <a
              href="https://www.facebook.com/share/15f2XhE4Re/"
              style={{ color: "blue" }}
            >
              <FaFacebook />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.instagram.com/ofcafitness?igsh=d3dtY2swbHJ5M20="
              style={{ color: "rgb(252,3,115" }}
            >
              <FaInstagram />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://youtube.com/@patricklyonsofficial?si=5Qh4_bhnqPcpPn5D"
              style={{ color: "red" }}
            >
              <FaYoutube />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.linkedin.com/in/patrick-a-lyons?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
"
              style={{ color: "rgb(3,119,252" }}
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </div>
      <span style={{ color: "gray", fontSize: "10px" }}>
        Created by VJ 13 SS
      </span>
    </div>
  );
}
