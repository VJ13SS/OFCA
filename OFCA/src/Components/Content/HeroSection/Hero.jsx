import "./Hero.css";

export default function Hero({displayNavLinks}) {
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
