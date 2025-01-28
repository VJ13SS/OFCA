import "./Hero.css";

export default function Hero({displayNavLinks}) {
  /*<div className="hero-header-content">
        <span>Our Transformations</span>
        <div className="transformations">
          <div className="model">
            <img src="./Images/OFCA_Model1.jpg" alt="" />
          </div>
          <div className="model">
            <img src="./Images/OFCA_Model2.jpg" alt="" />
          </div>
          <div className="model">
            <img src="./Images/OFCA_Model3.jpg" alt="" />
          </div>
        </div>
      </div>*/
  return (
    <div className="hero">
      <div className="hero-header">
        <span>BIGGER . FASTER . STRONGER</span>
        <h2>JOIN THE MOVEMENT</h2>
        <h3>GET STARTED TODAY</h3>
      </div>
      
      <a href="#about-page">Learn More</a>
    </div>
  );
}
