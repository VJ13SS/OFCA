import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SideLinks.css";
import { FaGreaterThan, FaLessThan, FaRunning } from "react-icons/fa";
import { IoMdMan } from "react-icons/io";

export default function Sidelinks() {
    const [displaySideBar,setDisplaySideBar] = useState(true)
    const [displaySideLinks,setDisplaySideLinks] = useState(false)

    const location = useLocation();//to display the side bar only on the home screen

  return (
    <div
      className="side-links"
      style={{
        width:displaySideLinks?'40%':'0%',
        height: displaySideLinks ? "270px" : "0px",
        borderTop: displaySideLinks ? "3px solid blue" : "",
        display: location.pathname == "/" ? "block" : "none",
      }}
    >
      {/*positon of button is relative to the position of the side links container */}
      <button onClick={() => setDisplaySideLinks(prev => !prev)} style={{right:displaySideLinks?'39%':'0'}}>{!displaySideLinks?<FaLessThan size={15}/>:<FaGreaterThan size={15}/>}</button>
      <ul style={{ display: displaySideLinks ? "flex" : "none" }}>
        <li>
          <a href="#" onClick={() => setDisplaySideLinks(false)}>
            Home
          </a>
        </li>
        <li>
          <a href="#about-page" onClick={() => setDisplaySideLinks(false)}>
            About Us
          </a>
        </li>
        <li>
          <a
            href="#testimonials-page"
            onClick={() => setDisplaySideLinks(false)}
          >
            Success Stories
          </a>
        </li>
        <li>
          <a href="#pricing-section" onClick={() => setDisplaySideLinks(false)}>
            Programs
          </a>
        </li>
      </ul>
    </div>
  );
}
