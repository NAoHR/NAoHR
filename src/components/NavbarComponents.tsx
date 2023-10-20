import { Header, Flex, Text, Group, Avatar, Stack } from "@mantine/core";
import Underline from "./misc/Underline";
import { useEffect, useState, useContext } from "react";
import {IconArrowBigUpLines, IconBooks,  IconFlower, IconQuote, } from "@tabler/icons";
import Theme, { ThemeCtx } from "../contexts/ThemeContexts";
import { ThemeCtxInterface } from "../contexts/ThemeContexts";
import {IconMoon, IconMoonOff, IconStar} from "@tabler/icons"


const SubNavbar = (props: {sto: boolean}) => {
    const { currentTheme, toggleTheme } = useContext<ThemeCtxInterface>(ThemeCtx);
    
    return (
        <Flex
            style={{
                position: "fixed",
                right: "10px",
                top: "90px",
                zIndex: 9,
                borderRadius: "4px"
            }}
            p="xs"
            direction={"column"}
            gap={"sm"}
            
            bg={currentTheme == 'dark' ? "dark.7" : "white"}
            >
                <Flex 
                className={`${props.sto && "bottomBorderPurple"} pointer`}
                gap={"sm"} justify={"space-evenly"} pb={"3px"}>
                    <Text size={"sm"} fw={"bold"}>Notes</Text>
                    <IconBooks />
                </Flex>
                <Flex 
                className={`${props.sto && "bottomBorderPurple"} pointer`}
                gap={"sm"} justify={"space-evenly"} pb={"3px"}>
                    <Text size={"sm"} fw={"bold"}>Poetry</Text>
                    <IconQuote />
                </Flex>
            </Flex>
    )
}

const NavbarComponents = () => {
    const [sto, setSTO] = useState(false)
    const [currentScroll, setCS] = useState<null | string>(null);
    const [sub, setSub] = useState<boolean>(false);

    const { currentTheme, toggleTheme } = useContext<ThemeCtxInterface>(ThemeCtx);

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
                top: "0px",
                borderBottom: sto ? "1.5px solid #DA77F2" : "0px"
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
                        <Text className="pointer" onClick={() => toggleTheme(currentTheme == "dark" ? "light" : "dark")} >
                            <Flex justify={"center"}>
                                {currentTheme == "dark" ? <IconMoon  /> : <IconMoonOff />}
                            </Flex>
                        </Text>
                        <Text className="pointer" onClick={() => setSub(!sub)} >
                            <Flex justify={"center"}>
                                <IconFlower />
                            </Flex>
                        </Text>
                    </Group>
                </Flex>
            </Header>
            {sub && <SubNavbar sto={sto} />}
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