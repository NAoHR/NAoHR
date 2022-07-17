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
            <div className="base-align">
                <div className="main-title">
                    <h1 className="title-text c-light poppins">
                        <span className="hastag poppins glowing-t">
                            #
                        </span>
                        MExplanation
                    </h1>
                </div>
                <div className="main-text">
                    <p className="text-m poppins c-light">
                        i got nothing to tell yet, but i promise ill give it out one day.
                    </p>
                    <br />
                    <p className="text-m poppins c-light">
                        passionate (?)
                        <span className="glowing-t">
                             <b> full-stack developer </b>
                        </span>
                         wannabe. i love the way machine works. either to get all the things done or help to overcome daily-basis. currently i am learning <b>typescript</b> and <b>postgresql</b> (just start).
                         I made this website to share all my <span className="glowing-t">
                             <b> code-journey </b>
                        </span>
                        and all the project that i have done.
                    </p>
                    <br />
                    <p className="text-m poppins c-light">
                        for me living is simply just saying enough, well i know we all aint got no real definition on what <b>enough</b> really mean. it's not depends on them, it's on you     <span className="glowing-t">
                             <b> always </b>
                        </span>
                    </p>
                </div>
            </div>
            <div className="base-align">
                <div className="main-title">
                    <h1 className="title-text c-light poppins">
                        <span className="hastag poppins glowing-t">
                            #
                        </span>
                        Tech Stack
                    </h1>
                </div>
                <div className="main-text">
                    <p className="text-m poppins c-light">
                        here lies those <span className="glowing-t">
                             <b> tech-stack </b>
                        </span> that i have learnt
                    </p>
                </div>
            </div>
        </>
    )
}