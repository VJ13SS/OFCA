import "./Navbar.css";
import { FaShoppingCart, FaBars, FaRegClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ cartItems }) {

  const [displayNavLinks, setDisplayNavLinks] = useState(false);
  const [displayCart, setDisplayCart] = useState(false);
  cartItems.sort((item1, item2) => item1.level - item2.level);
  const navigate = useNavigate();

 /// cartItems.sort((item1, item2) => item1.level - item2.level);
  const navCartItems = cartItems.map((item, index) => {
    return (
      <div className="item" key={index}>
        <div className="item-image">
          <img src="./Images/OFCA_LOGO.png" />
        </div>
        <div className="item-details">
          <h3>Level {item.level}</h3>
          <h2>
            {item.plan == "3 Monthly Payments"
              ? "OFCA Certification Program 3 Months"
              : "OFCA Certification Program Full Certification"}
          </h2>
          <h3>
            Price :{" "}
            <span style={{ color: "green" }}>
              {item.amount * item.quantity}
            </span>
          </h3>
          <h3>Quantity: {item.quantity}</h3>
        </div>
      </div>
    );
  });

  const location = useLocation();
  
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img src="./Images/OFCA_LOGO.png" />
        </Link>
      </div>
      <div className="nav-center">
        <h2>Fitness Is Life</h2>
      </div>

      <div className="nav-right">
        <FaRegClock
          className="nav-icon"
          onClick={() => navigate("/purchase-history")}
        />
        <FaShoppingCart className="nav-icon" onClick={() => setDisplayCart((prev) => !prev)} />
        <FaBars
        className="nav-icon"
          style={{
            color: "rgb(52,125,235",
            display: location.pathname == "/" ? "block" : "none",
          }}
          onClick={() => setDisplayNavLinks((prev) => !prev)}
        />
      </div>
      {/*The Navigation Links similar to the ones in the side bar*/}
      <div
        className="nav-links"
        style={{
          height: displayNavLinks ? "270px" : "0px",
          borderTop: displayNavLinks ? "3px solid blue" : "",
          display: location.pathname == "/" ? "block" : "none",
        }}
      >
        <ul style={{ display: displayNavLinks ? "flex" : "none" }}>
          <li>
            <a href="#" onClick={() => setDisplayNavLinks(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about-page" onClick={() => setDisplayNavLinks(false)}>
              About Us
            </a>
          </li>
          <li>
            <a
              href="#testimonials-page"
              onClick={() => setDisplayNavLinks(false)}
            >
              Success Stories
            </a>
          </li>
          <li>
            <a
              href="#pricing-section"
              onClick={() => setDisplayNavLinks(false)}
            >
              Programs
            </a>
          </li>
        </ul>
      </div>

      {/*Cart section shown on the nav bar */}
      <div
        className="nav-cart"
        style={{
          transform: displayCart ? "translateY(0px)" : "",
          opacity: displayCart ? "1" : "0",
          zIndex: displayCart ? "25" : "0",
        }}
      >
        <div className="nav-cart-links">
        <a href="/cart">Click to vist cart</a>
        </div>
        
        {navCartItems.length == 0 && <h5>No items in cart</h5>}
        {navCartItems.length > 3 && <h6>**scroll down for more</h6>}
        <div className="nav-cart-items">{navCartItems}</div>
      </div>
    </div>
  );
}
