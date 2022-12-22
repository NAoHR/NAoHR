import { 
  Container, Flex, 
} from "@mantine/core";
import NavbarComponents from "./components/NavbarComponents";

import Quotes from "./components/misc/Quotes";
import Greetings from "./components/Greetings";

function App() {

  return (
    <>
      <NavbarComponents />

      <Container 
      size={"xl"} 
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
        size={"xl"}
        >
          
        <Flex
        p={"lg"}
        direction="column"
        gap={"40px"}
        >

          <Greetings />

        </Flex>
      </Container>

    </>
  );
}

export default App;
