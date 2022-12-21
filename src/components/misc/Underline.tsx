import { useEffect, useState } from "react";

const Underline = ({ mtop="0px"}) => {
    const [pr, setPr] = useState(100);

    useEffect(()=> {
        setInterval(()=> {
        setPr(Math.floor(Math.random() * 100))
        }, 1500)
    }, [])

    return (
        <div className="glowing" style={{
            width: `${pr}%`,
            marginTop: mtop,
            height: "3px",
            transition: ".3s"
        }}></div>
    )
}

export default Underline