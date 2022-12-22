import { 
  Container, Flex, 
} from "@mantine/core";
import NavbarComponents from "./components/NavbarComponents";

import Quotes from "./components/misc/Quotes";
import Greetings from "./components/Greetings";
import TechStack from "./components/Techstack";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <NavbarComponents />

      <Container 
      size={"lg"} 
      h="100vh"
      maw="800px"
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
        size={"md"}
        >
          
        <Flex
        p={"lg"}
        direction="column"
        gap={"40px"}
        >

          <Greetings />
          <TechStack />
          <Projects />
          <Footer />
          
        </Flex>
      </Container>
    </>
  );
}

export default App;
