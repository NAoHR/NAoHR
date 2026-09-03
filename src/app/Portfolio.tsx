import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";

import Intro from "../components/Intro";
import NavbarComponents from "../components/NavbarComponents";
import Greetings from "../components/Greetings";
import TechStack from "../components/Techstack";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { theme } from "../theme";
import { Container, Flex } from "@mantine/core";

/**
 * Root of the single React island. Astro owns routing and the document, so
 * this provides only what Mantine needs and renders the portfolio sections.
 */
const Portfolio = () => (
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <a className="skip-link" href="#me">
        Skip to content
      </a>

      <Intro />

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
    </MantineProvider>
  </StrictMode>
);

export default Portfolio;
