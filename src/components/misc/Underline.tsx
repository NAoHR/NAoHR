import { useEffect, useRef } from "react";

const Underline = ({ mtop="0px", st=false, w="30%"}) => {
    const elementRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=> {
        if(!st){
            setInterval(()=> {
                if(elementRef.current !== null){
                    elementRef.current.style.width = `${Math.floor(Math.random() * 100)}%`
                }
            }, 1300)
        }

    }, [])

    return (
        <div className="glowing" id="gl" ref={elementRef} style={{
            width: `${st ? w : "100%"}`,
            marginTop: mtop,
            height: "3px",
            transition: ".3s"
        }}></div>
    )
}

export default Underline