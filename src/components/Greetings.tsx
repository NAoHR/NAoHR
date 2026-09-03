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
          Hi{" "}
          <span className="wave" role="img" aria-label="waving hand">
            👋
          </span>
          , Najmi&apos;s Here
          <Underline />
        </Title>

        <Text fw={400} size="lg">
          A <span className="gradient-text">backend developer</span>.
        </Text>
        <Text>
          I love the way machines work — how a message leaves one system, crosses three
          more, and still balances at the end. Most of my work is Java and Spring Boot:
          middleware, e-wallets and payment rails.
        </Text>

        <Text fw={400} size="lg">
          I made this website to share my code journey and the things I have built — client
          work under Professional, my own projects under Personal. A blog about the job is
          probably coming too.
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
