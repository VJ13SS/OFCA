import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./About.css";
import { details_one, details_two } from "./AboutDetails";
import { useState } from "react";

export default function About() {
  const cards = details_one.map((item, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-content">
          <h2>{item.heading}</h2>
          <p>{item.content}</p>
        </div>
      </div>
    );
  });

  const [reactangleContent, setReactangleContent] = useState(details_two);
  const displayRectangleContent = (contentId) => {
    setReactangleContent((prev) =>
      prev.map((item) =>
        item.id == contentId
          ? { ...item, displayContent: !item.displayContent }
          : { ...item, displayContent: false }
      )
    );
  };

  //to trigger the display of about section 4 content
  const [displayCreateDetails, setDisplayCreateDetails] = useState(false);
  //https://lyon.training/online-fitness-coach-academy/
  const rectangles = reactangleContent.map((item, index) => {
    return (
      <div
        className="rectangle"
        key={index}
        style={{
          backgroundColor:
            index == 0
              ? "rgb(6,12,43)"
              : index == 1
              ? "white"
              : "rgb(255,20,20)",
          color: index == 0 ? "white" : index == 1 ? "black" : "white",
          height: item.displayContent ? "fit-content" : "30px",
        }}
      >
        <div className="reactangle-content">
          <h1 style={{ fontSize: item.displayContent ? "20px" : "12px" }}>
            {item.heading}
          </h1>
          {!item.displayContent ?
          <FaChevronDown
            style={{
              position: "absolute",
              top: "15px",
              right: "10px",
              cursor: "pointer",
            }}
            size={23}
            onClick={() => displayRectangleContent(item.id)}
          />:
          <FaChevronUp
            style={{
              position: "absolute",
              top: "15px",
              right: "10px",
              cursor: "pointer",
            }}
            size={23}
            onClick={() => displayRectangleContent(item.id)}
          />
  }
          {item.displayContent && <p>{item.content}</p>}
        </div>
      </div>
    );
  });

  return (
    <div className="about" id="about-page">
      <div className="about-section-1">
        <span>JOIN OUR FAMILY</span>
        <p>
          Through the Online Fitness Coach Academy, you have the opportunity to
          obtain the Online Fitness Coach Academy (OFCA) Certification. The
          Online Fitness Coach Academy teaches you virtually everything you
          could possibly want to know in the fitness/nutrition/exercise/health
          sphere based on the current scientific literature in the field. The
          content in the Academy spans literally 1000s of studies across decades
          of research. And when you complete the Online Fitness Coach Academy
          coursework and pass all the assessments, you will be an OFCA certified
          online coach.
        </p>
        <span className="link">
          <a href="#pricing-section">BECOME A MEMBER</a>
        </span>
      </div>
      <div className="about-section-2">
        <div className="about-cards">{cards}</div>
      </div>
      <div className="about-section-3">
        <div className="about-rectangles">{rectangles}</div>
      </div>
      <div className="about-section-4">
        <span>What Went Into Creating The Online Fitness Coach Academy?</span>
        {displayCreateDetails ? (
          <FaChevronUp
            size={23}
            style={{ cursor: "pointer" ,marginBottom:'7px'}}
            onClick={() => setDisplayCreateDetails((prev) => !prev)}
          />
        ) : (
          <FaChevronDown
            size={23}
            style={{ cursor: "pointer" }}
            onClick={() => setDisplayCreateDetails((prev) => !prev)}
          />
        )}

        <p style={{ display: displayCreateDetails ? "block" : "none" }}>
          The Online Fitness Coach Academy is an officially registered
          trademark, and the content covered across the five levels of the
          Academy spans 1000s of studies across the scientific literature,
          including case studies, systematic reviews, meta-analyses, EMG
          studies, and more. No other officially-recognized online coach
          certification program currently exists. Drawing on over 15 years of
          direct training and fitness coaching experience, the content for all
          five certification levels was researched, developed, and compiled on a
          daily basis over the course of 17 months of working with hundreds of
          clients from all over the world with a variety of goals, pain-points,
          nuances, restrictions, limitations, equipment access, backgrounds,
          lifestyles, and schedules. During these 17 months, I released six new
          custom fitness programs and began laying the foundation for three more
          programs that will be released in the future; the content contained
          across the five levels is vast enough to literally create optimal
          fitness and nutrition programs for years to come. I’ve personally been
          able to apply the material to my own life so thoroughly that I’ve not
          only gotten in the best shape of my life, but I’ve surpassed what I
          ever thought possible. I bring all of this up because the content
          contained herein was developed simultaneously to my own fitness
          journey and my clients’ journeys as a means of answering all of my own
          questions, all of my clients’ questions, and solving many of their
          problems (within the scope of practice described within the Online
          Fitness Coach Academy disclaimer). Even after over a decade of
          experience in the industry, researching for the Academy on a daily
          basis for the past 17 months has taken my understanding of fitness and
          nutrition to another level that I’ve always dreamed of achieving, both
          for myself and for my clients. If you’re ready to do the same, join
          the Online Fitness Coach Academy now.
        </p>
      </div>
    </div>
  );
}
