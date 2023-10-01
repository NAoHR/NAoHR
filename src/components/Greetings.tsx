import { 
    Title, Flex, 
    Group, Button, 
    Text, Avatar, Blockquote 
} from "@mantine/core";
import Underline from "./misc/Underline";
import {IconBrandGithub, IconBrandInstagram, IconBrandLinkedin,  IconBrandTwitter, IconCode, IconPodium} from "@tabler/icons";



const Greetings = () => {
    return (
        <>
        <Group>
            <Flex
            direction={"column"}
            gap="lg"
            align={"flex-start"}
            id="me"
            >
                <Title fw={500} className="unbounded" order={2} >
                    Hello People, Najmi's Here
                  <Underline />
                </Title>

              <Text 
              fw={400} 
              size="lg">
                Somenonne Who Wants to Be A <span className="glowing glowingT bold">
                Passionate (?) full-stack Developer</span>. 
                I love the way machine works. either to get all the things done or help to overcome daily-basis. 
                Currently improving my skills related to Java and Spring technology (Springboot). 
              </Text>
              <Text 
              fw={400} 
              size="lg">
                I made this website to share all my code-journey and all the project that i have done. 
                Probably I am going to write a little bit of a blog about my daily basis and my software engineering job as a java developer.
              </Text>
              <Blockquote color="violet" cite="– Thought" icon={<IconPodium/>} mt="sm">
              Learning Is Not A Matter of How Fast Someone Could Master it, Yet it's About How Presistence We Are To Master It
            </Blockquote>
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
                <a href="https://www.linkedin.com/in/najmi207">
                  <Avatar color={"grape"} radius="xl">
                    <IconBrandLinkedin size={24} />
                  </Avatar>
                </a>
              </Flex>
              <a href="https://drive.google.com/file/d/130HyCE5WHPPNVo-XJ7QFYtqlAXZKPki6/view?usp=sharing">
                <Button size="md" className="glowing">
                  Curriculum Vitae
                </Button>
              </a>
            </Flex>

          </Group>
        </>
    )
}

export default Greetings;