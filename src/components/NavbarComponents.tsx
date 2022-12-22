import { Header, Flex, Text, Group, Avatar } from "@mantine/core";
import Underline from "./misc/Underline";
import { useEffect, useState } from "react";
import {IconArrowBigUpLines} from "@tabler/icons";

const NavbarComponents = () => {
    const [sto, setSTO] = useState(false)
    useEffect(()=>{
        document.addEventListener("scroll", function(){
            if(window.pageYOffset >= 60){
                setSTO(true)
            }else{
                setSTO(false);
            }
        })
    },[])

    function scrollToSub(idName: string){
        
        const idTobeScrolled = document?.getElementById(idName)?.offsetTop;
        if(idTobeScrolled) window.scrollTo(0, idTobeScrolled - 90);
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
                        </Text>
                        <Text className="pointer" onClick={() => scrollToSub("stack")}>
                            Stack
                        </Text>
                        <Text className="pointer" onClick={() => scrollToSub("projects")}>
                            Projects
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