import { Container, Flex } from "@mantine/core";

import NavbarComponents from "../components/NavbarComponents";
import Greetings from "../components/Greetings";
import TechStack from "../components/Techstack";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <a className="skip-link" href="#me">
        Skip to content
      </a>

      <NavbarComponents />

      {/* pt clears the fixed 80px header. */}
      <Container size="md" component="main" pt={110}>
        <Flex p="lg" direction="column" gap="40px">
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
