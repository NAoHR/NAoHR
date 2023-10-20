import { Text, Container, Flex } from "@mantine/core";
import { IconHeart } from "@tabler/icons";

const NotFound = () => {
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
                        Even If I Was Born Color Blind, You'd Still Be My Favorite Shades
                    </Text>
                </Flex>

            </Container>
        </>
    );
}

export default NotFound;