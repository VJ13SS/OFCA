import "./Testimonials.css";

export default function Testimonials() {

  return (
    <div className="testimonials" id="testimonials-page">
      <div className="testimonials-header">
        <span>"</span>
        <h1>SUCCESS STORIES</h1>
        <p>
          <span>JOIN THE MOVEMENT</span>
        </p>
      </div>
      <div className="testimonials-content">
        <div className="testimonial">
          <div className="image">
            <img src="./Images/Testimonial_1.jpg" alt="" />
          </div>
        </div>
        <div className="testimonial">
          <div className="image">
            <img src="./Images/Testimonial_2.jpg" alt="" />
          </div>
        </div>
        <div className="testimonial">
          <div className="image">
            <img src="./Images/Testimonial_3.jpg" alt="" />
          </div>
        </div>
        <div className="testimonial">
          <div className="image">
            <img src="./Images/Testimonial_4.jpg" alt="" />
          </div>
        </div>
        <div className="testimonial">
          <div className="image">
            <img src="./Images/Testimonial_5.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
