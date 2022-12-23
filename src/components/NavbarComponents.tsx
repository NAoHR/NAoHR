import { Header, Flex, Text, Group, Avatar } from "@mantine/core";
import Underline from "./misc/Underline";
import { useEffect, useState } from "react";
import {IconArrowBigUpLines} from "@tabler/icons";

const NavbarComponents = () => {
    const [sto, setSTO] = useState(false)
    const [currentScroll, setCS] = useState<null | string>(null);

    function compareAndSetCS(offTop: number, height: number, current: number, val: string){
        if(offTop - 120 <= current && current <= (offTop - 120 + height * 60/100)){
            if(currentScroll !== val){
                setCS(val)
            }
        }
    }

    useEffect(()=>{
        document.addEventListener("scroll", function(){

            if(window.pageYOffset >= 60){
                setSTO(true)
            }else{
                setSTO(false);
            }

            const currentY = window.pageYOffset;

            const me = document?.getElementById("me");
            const stack = document?.getElementById("stack");
            const projects = document?.getElementById("projects");

            if(me && stack && projects && currentY){
                if(currentY <= (me.offsetTop- 300) ) setCS(null);
                compareAndSetCS(me.offsetTop, me.offsetHeight, currentY, "me");
                compareAndSetCS(stack.offsetTop, stack.offsetHeight, currentY, "stack");
                compareAndSetCS(projects.offsetTop, projects.offsetHeight, currentY, "projects");
            }
        })
    },[])

    function scrollToSub(idName: string){
        
        const idTobeScrolled = document?.getElementById(idName)?.offsetTop;
        if(idTobeScrolled) window.scrollTo(0, idTobeScrolled - 100);
    }

    return (
        <>
            <Header height={80} style={{
                position: "fixed",
                top: "0px"
            }}>
                <Flex
                p={"lg"}
                mih={"100%"}
                align="center"
                justify={"space-between"}
                fw={700}
                >
                    <Text >
                        NA
                        <span className="glowing glowingT">
                        o
                        </span>
                        HR
                        <Underline />
                    </Text>

                    <Group>
                        <Text component="a" className="pointer" onClick={() => scrollToSub("me")}>
                            Me
                            {currentScroll == "me" ? <Underline /> : <></>}
                        </Text>
                        <Text className="pointer" onClick={() => scrollToSub("stack")}>
                            Stack
                            {currentScroll == "stack" ? <Underline /> : <></>}
                        </Text>
                        <Text className="pointer" onClick={() => scrollToSub("projects")}>
                            Projects
                            {currentScroll == "projects" ? <Underline /> : <></>}
                        </Text>
                    </Group>
                </Flex>
            </Header>
            {
                sto
                &&
                <Avatar className={"pointer"} style={{position: "fixed", bottom: "10px", right: "10px" ,border: "2px solid #DA77F2", zIndex: 8}} radius={"xl"} onClick={()=> window.scrollTo(0,0)}>
                    <IconArrowBigUpLines size={24} />
                </Avatar>
            }
        </>
    )
}

export default NavbarComponents;