import "../styles/pages/index.css";
import Navbar from "../components/Navbar";
import {FaInstagramSquare, FaGithub, FaTwitterSquare, FaTelegram,FaDownload, FaLinkedin} from "react-icons/fa";

const dataTech = [
    {
        name: "javascript",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902"
    },
    {
        name: "python",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png"
    },
    {
        name : "typescript",
        image: "https://www.saashub.com/images/app/service_logos/11/ad388324edad/large.png?1531424414"
    },
    {
        name : "nodejs",
        image : "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
    },
    {
        name : "mongodb",
        image : "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld"
    },
    {
        name : "react",
        image : "https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png"
    },
    {
        name : "nextjs",
        image : "https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png"
    },
    {
        name : "expressjs",
        image : "https://tylersharpdeveloper.vercel.app/static/media/express.d638bd34.png"
    }
]

function CardImage({image,id}){
    
    return (
        <div className="ts-card">
            <div className="ts-main">
                <img src={image} alt="" className="ts-image"/>
            </div>
        </div>
    )
}

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
                        <a href="https://www.linkedin.com/in/najmi207">
                            <h4 className="sm-perk c-light">
                                <FaLinkedin />
                            </h4>
                        </a>
                    </div>
                    <a href="https://docs.google.com/document/d/1AAlO0WLIV2_uVwyOs-jDkFugDJ_7PGBLs-_W4xFGceA/edit?usp=sharing">
                        <div className="download-porto b-purple">
                            <h2 className="dporto-t bebas c-light">
                                <FaDownload /> Portofolio
                            </h2>
                        </div>
                    </a>
                </div>
            </div>
            <div className="base-align" id="me">
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
            <div className="base-align" id="stack">
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
                <div className="tech-stack-content">
                    {
                        dataTech.map((val)=>{
                            return <CardImage image={val.image} key={val.name} />
                        })
                    }
                </div>
            </div>
            <div className="base-align" id="project">
                <div className="main-title">
                    <h1 className="title-text c-light poppins">
                        <span className="hastag poppins glowing-t">
                            #
                        </span>
                        Project
                    </h1>
                </div>
                <div className="main-text">
                    <p className="text-m poppins c-light">
                        Will be added <span className="glowing-t">
                             <b> Soon </b>
                        </span>, just sit tight
                    </p>
                </div>
            </div>
        </>
    )
}