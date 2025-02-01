import Hero from "./HeroSection/Hero";
import './Content.css'
import About from "./About/About";
import Testimonials from "./Testimonials/Testimonials";
import Pricings from "./Pricings/Pricings";
import Sidelinks from "../NavLinks/SideLinks";

export default function Content({itemsPurchased}){
    return(
        <div className="content">
            <Hero />
            <About />
            <Testimonials />
            <Pricings />
            <Sidelinks />
        </div>
    )
}