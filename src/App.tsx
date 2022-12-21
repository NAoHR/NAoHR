import { 
  Container, 
  Title, Flex, 
  Group, Button, 
  Text, Avatar } from "@mantine/core";
import NavbarComponents from "./components/NavbarComponents";
import Underline from "./components/misc/Underline";
import Quotes from "./components/misc/Quotes";

import {IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTelegram, IconBrandTwitter, IconCode} from "@tabler/icons";

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
                Hello People, Najmi's Here
              <Underline />
            </Title>

            <Text fw={400} size="lg">
              <span className="glowing glowingT bold">passionate (?) full-stack developer wannabe</span>. i love the way machine works. either to get all the things done or help to overcome daily-basis. I am on my way to learn Java. I made this website to share all my code-journey and all the project that i have done.
              for me living is simply just saying enough, well i know we all aint got no real definition on what enough really mean. it's not depends on them, it's on you always
              <Flex
              pt={30}
              gap={8}
              >
                <a href="https://github.com/NAoHR">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandGithub size={24} />
                  </Avatar>
                </a>
                <a href="https://www.codewars.com/users/Najmi">
                  <Avatar color={"grape"} radius="xl">
                    <IconCode size={24} />
                  </Avatar>
                </a>
                <a href="https://instagram.com/najmi_2821">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandInstagram size={24} />
                  </Avatar>
                </a>
                <a href="https://twitter.com/bintangbhsarab">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandTwitter size={24} />
                  </Avatar>
                </a>
                <a href="">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandTelegram size={24} />
                  </Avatar>
                </a>
                <a href="https://www.linkedin.com/in/najmi207">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandLinkedin size={24} />
                  </Avatar>
                </a>
              </Flex>
            </Text>
            <a href="https://drive.google.com/file/d/130HyCE5WHPPNVo-XJ7QFYtqlAXZKPki6/view?usp=sharing">
              <Button size="md" className="glowing">
                Curriculum Vitae
              </Button>
            </a>

          </Group>
        </Flex>
      </Container>

    </>
  );
}

export default App;
