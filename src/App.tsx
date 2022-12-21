import { 
  Container, 
  Title, Flex, 
  Group, Blockquote, 
  Text, } from "@mantine/core";
import NavbarComponents from "./components/NavbarComponents";
import Underline from "./components/misc/Underline";
import Quotes from "./components/misc/Quotes";

function App() {

  return (
    <>
      <NavbarComponents />

      <Container 
      size={"xl"} 
      h="100vh"
      w="100vw"
      >
        <Flex
        mih="100%"
        miw="100%"
        justify="center"
        align={"center"}
        >
          <Quotes />
        </Flex>
      </Container>

      <Container 
      size={"xl"}
      >
        <Flex
        p={"lg"}
        direction="column"
        gap={"xl"}
        >
          <Group>
            <Title fw={500} className="unbounded" order={2}>
                Hello People
              <Underline />
            </Title>

            <Text fw={400} size="lg">
              My name is Najmi, <span className="glowing glowingT bold">passionate (?) full-stack developer wannabe</span>. i love the way machine works. either to get all the things done or help to overcome daily-basis. I am on my way to learn Java. I made this website to share all my code-journey and all the project that i have done.
              for me living is simply just saying enough, well i know we all aint got no real definition on what enough really mean. it's not depends on them, it's on you always
            </Text>
          </Group>
        </Flex>
      </Container>

    </>
  );
}

export default App;
