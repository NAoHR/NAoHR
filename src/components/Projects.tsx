import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  List,
  Paper,
  Tabs,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from "@mantine/core";
import { IconBriefcase, IconCode, IconExternalLink } from "@tabler/icons-react";
import { useState } from "react";

import experience from "../utils/experience.json";
import projects from "../utils/projects.json";

const bullet = (Icon: typeof IconCode) => (
  <ThemeIcon size={25} variant="gradient" gradient={{ from: "pink", to: "grape" }} radius="xl">
    <Icon size={14} />
  </ThemeIcon>
);

const PersonalProjects = () => (
  <Timeline w="100%" bulletSize={24}>
    {projects.map((project) => (
      <Timeline.Item key={project.title} bullet={bullet(IconCode)}>
        <Paper radius="sm">
          <Flex direction="column" justify="flex-start" gap="xs" align="flex-start">
            <Box pos="relative" w="100%">
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                h={220}
                w="100%"
                radius="md"
                fit="cover"
                loading="lazy"
              />
              {/* Dims the cover so the text below stays the focus. */}
              <Box
                aria-hidden="true"
                pos="absolute"
                inset={0}
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                  background: "light-dark(rgba(248, 249, 250, 0.3), rgba(44, 46, 51, 0.6))",
                }}
              />
            </Box>

            <Title order={3} mt="xs">
              {project.title}
            </Title>

            <Text size="lg">{project.description}</Text>

            <Flex gap={8} pt="sm" wrap="wrap">
              {project.tag.map((tag) => (
                <Badge key={tag} variant="light" color="violet" radius="sm">
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Text
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              fw={700}
              size="lg"
              style={{ alignSelf: "flex-end" }}
              aria-label={`Visit ${project.title} on GitHub`}
            >
              Visit <IconExternalLink size={20} />
            </Text>
          </Flex>
        </Paper>
      </Timeline.Item>
    ))}
  </Timeline>
);

const ProfessionalExperience = () => (
  <Timeline w="100%" bulletSize={24}>
    {experience.map((role) => (
      <Timeline.Item key={`${role.title}-${role.period}`} bullet={bullet(IconBriefcase)}>
        <Paper radius="sm">
          <Flex direction="column" justify="flex-start" gap="xs" align="flex-start">
            <Box pos="relative" w="100%">
              <Image
                src={role.image}
                alt={`${role.title} cover`}
                h={220}
                w="100%"
                radius="md"
                fit="cover"
                loading="lazy"
              />
              {/* Dims the cover so the text below stays the focus. */}
              <Box
                aria-hidden="true"
                pos="absolute"
                inset={0}
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                  background: "light-dark(rgba(248, 249, 250, 0.3), rgba(44, 46, 51, 0.6))",
                }}
              />
            </Box>

            <Title order={3} mt="xs">
              {role.title}
            </Title>

            <Text size="sm" c="dimmed">
              {role.role} · {role.company} · {role.period}
            </Text>

            <Text size="lg">{role.description}</Text>

            <List size="md" spacing="xs" pt="xs" withPadding>
              {role.highlights.map((highlight) => (
                <List.Item key={highlight}>{highlight}</List.Item>
              ))}
            </List>

            <Flex gap={8} pt="sm" wrap="wrap">
              {role.tag.map((tag) => (
                <Badge key={tag} variant="light" color="violet" radius="sm">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Paper>
      </Timeline.Item>
    ))}
  </Timeline>
);

const Projects = () => {
  const [tab, setTab] = useState<string | null>("professional");

  return (
    <Group id="projects">
      <Title fw={500} order={3}>
        Experiences & Projects
      </Title>
      <Tabs value={tab} onChange={setTab} color="violet" w="100%" mt="sm">
        <Tabs.List mb="xl">
          <Tabs.Tab value="professional" leftSection={<IconBriefcase size={16} />}>
            Professional
          </Tabs.Tab>
          <Tabs.Tab value="personal" leftSection={<IconCode size={16} />}>
            Personal
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="professional">
          <ProfessionalExperience />
        </Tabs.Panel>

        <Tabs.Panel value="personal">
          <PersonalProjects />
        </Tabs.Panel>
      </Tabs>
    </Group>
  );
};

export default Projects;
