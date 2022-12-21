import { Header, Flex, Text, Group } from "@mantine/core";
import Underline from "./misc/Underline";

const NavbarComponents = () => {
    
    return (
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
                    <Text>
                        Me
                    </Text>
                    <Text>
                        Stack
                    </Text>
                    <Text>
                        Projects
                    </Text>
                </Group>
            </Flex>
        </Header>
    )
}

export default NavbarComponents;