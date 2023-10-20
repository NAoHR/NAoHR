import { Text, Container, Flex } from "@mantine/core";
import poetList from "../utils/poet.json";
const CustomElement = () => {
    return (
        <>
            <Container
                size={"lg"}
                h="100vh"
                maw="800px"
            >
                <Flex
                    mih="100%"
                    miw="100%"
                    direction={"column"}
                    justify="center"
                    align={"center"}
                >
                    <Text fw={700} size="lg">
                        404
                    </Text>
                    <Text>
                        {poetList[Math.floor(Math.random() * poetList.length)]}
                    </Text>
                </Flex>
            </Container>
        </>
    );
}

export default CustomElement;