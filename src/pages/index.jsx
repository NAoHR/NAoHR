import "../styles/pages/index.css";
import Navbar from "../components/Navbar";
import {FaInstagramSquare, FaGithub, FaTwitterSquare, FaTelegram,FaDownload} from "react-icons/fa";

export default function Index() {
    return (
        <>
            <Navbar />
            <div className="welcoming">
                <div className="decoration">
                    <div className="dots">
                    </div>
                    <div className="dots">
                    </div>
                    <div className="dots">
                    </div>
                </div>
                <img src="/assets/welcoming.svg" alt="" className="wc-svg"/>
                <div className="text-side">
                    <h2 className="welcome-to-my-guys">
                        <span className="sup-g poppins c-light">
                            Hello. my name is
                        </span>
                        <br />
                        <span className="bebas name glowing-t">
                            Najmi
                        </span>
                        <br /> 
                        <span className="c-light poppins">
                            Wanna be a Full-Stack Developer.
                        </span>
                    </h2>
                    <div className="social-media-side">
                        <a href="https://github.com/NAoHR">
                            <h4 className="sm-perk c-light">
                                <FaGithub />
                            </h4>
                        </a>
                        <a href="https://instagram.com/najmi_2821">
                            <h4 className="sm-perk c-light">
                                <FaInstagramSquare />
                            </h4>
                        </a>
                        <a href="https://twitter.com/bintangbhsarab">
                            <h4 className="sm-perk c-light">
                                <FaTwitterSquare />
                            </h4>
                        </a>
                        <a href="">
                            <h4 className="sm-perk c-light">
                                <FaTelegram />
                            </h4>
                        </a>
                    </div>
                    <a href="">
                        <div className="download-porto b-purple">
                            <h2 className="dporto-t bebas c-light">
                                <FaDownload /> Portofolio
                            </h2>
                        </div>
                    </a>
                </div>
            </div>
            <div className="mexplanation">
                <div className="main-title">
                    <h1 className="title-text c-light poppins">
                        <span className="hastag poppins glowing-t">
                            #
                        </span>
                        MExplanation
                    </h1>
                </div>
            </div>
        </>
    )
}