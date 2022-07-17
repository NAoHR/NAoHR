import "../styles/components/navbar.css";
import {FaHeart} from "react-icons/fa";

export default function Navbar() {
    return (
        <>
        <div className="blurr">
            
        </div>
        <nav className="navbar-main">
            <div className="navbar-content">
                <div className="nb-perks">
                    <p className="title poppins c-light">NA
                    <span className="glowing-t">o</span>
                    HR</p>
                </div>
                <div className="nb-rightside">
                    <a href="#">
                        <div className="nb-perks">
                            <p className="rs-perks poppins c-light">Me</p>
                        </div>
                    </a>
                    <a href="#">
                        <div className="nb-perks">
                            <p className="rs-perks poppins c-light">Stack</p>
                        </div>
                    </a>
                    <a href="#">
                        <div className="nb-perks">
                            <p className="rs-perks poppins c-light">Project</p>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
        <div className="sc-wrap glowing">
            <div className="scroll-up b-light">
                <p className="poppins c-black sc-t">
                    <FaHeart />
                </p>
            </div>
        </div>
        </>
    )
}