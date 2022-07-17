import "../styles/components/navbar.css";
import {FaHeart} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [displaybg,setDBG] = useState(false);
    const navbar = document.getElementsByClassName("navbar-main")[0];
    
    function scrollToUp(){
        window.scrollTo(0,0);
    }
    useEffect(()=>{
        document.addEventListener("scroll", function(){
            if(window.pageYOffset >= 60){
                setDBG(true)
            }else{
                setDBG(false);
            }
        })
    },[])

    useEffect(()=>{
        if(navbar){
            navbar.style = `background: ${displaybg ? "var(--black)" : "none"}; transition: .5s;`
        }
    },[displaybg, navbar])
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
        <div className="sc-wrap glowing" onClick={scrollToUp}>
            <div className="scroll-up b-light">
                <p className="poppins c-black sc-t">
                    <FaHeart />
                </p>
            </div>
        </div>
        </>
    )
}