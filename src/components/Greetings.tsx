import { Avatar, Flex, Group, Text, Title } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
} from "@tabler/icons-react";

import Quotes from "./misc/Quotes";
import Underline from "./misc/Underline";


const SOCIALS = [
  { label: "GitHub", href: "https://github.com/NAoHR", Icon: IconBrandGithub },
  { label: "Codewars", href: "https://www.codewars.com/users/Najmi", Icon: IconCode },
  { label: "Instagram", href: "https://instagram.com/najmi_2821", Icon: IconBrandInstagram },
  { label: "X", href: "https://twitter.com/bintangbhsarab", Icon: IconBrandX },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/najmi207", Icon: IconBrandLinkedin },
];

const Greetings = () => {
  return (
    <Group>
      <Flex direction="column" gap="lg" align="flex-start" id="me">
        <Title fw={800} order={2}>
          Hello People, Najmi&apos;s Here
          <Underline />
        </Title>

        <Text fw={400} size="lg">
          Someone who wants to be a{" "}
          <span className="gradient-text">passionate (?) full-stack developer</span>. I love
          the way machines work, either to get all the things done or to help overcome the
          daily basis. Currently improving my skills related to Java and Spring technology
          (Spring Boot).
        </Text>

        <Text fw={400} size="lg">
          I made this website to share all my code journey and all the projects that I have
          done. Probably I am going to write a little bit of a blog about my daily basis and
          my software engineering job as a Java developer.
        </Text>

        <Quotes />

        <Flex pt={30} gap={8} component="ul" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Avatar color="grape" radius="xl">
                  <Icon size={24} />
                </Avatar>
              </a>
            </li>
          ))}
        </Flex>
      </Flex>
    </Group>
  );
};

export default Greetings;
