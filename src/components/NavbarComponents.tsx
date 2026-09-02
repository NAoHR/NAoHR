import {
  ActionIcon,
  Box,
  Burger,
  Drawer,
  Flex,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBigUpLines, IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Underline from "./misc/Underline";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolledPast } from "../hooks/useScrolledPast";

const SECTIONS = [
  { id: "me", label: "Me" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

const HEADER_HEIGHT = 80;

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 20,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

const NavbarComponents = () => {
  const scrolled = useScrolledPast(60);
  const active = useActiveSection(SECTION_IDS);

  const { setColorScheme } = useMantineColorScheme();
  const scheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

  const [drawerOpened, drawer] = useDisclosure(false);

  const toggleScheme = () => setColorScheme(scheme === "dark" ? "light" : "dark");

  const navLinks = SECTIONS.map(({ id, label }) => (
    <UnstyledButton
      key={id}
      onClick={() => {
        drawer.close();
        scrollToSection(id);
      }}
      aria-current={active === id ? "true" : undefined}
    >
      <Text fw={700}>{label}</Text>
      {active === id && <Underline />}
    </UnstyledButton>
  ));

  return (
    <>
      <Box
        component="header"
        h={HEADER_HEIGHT}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "var(--mantine-color-body)",
          borderBottom: scrolled ? "1.5px solid #DA77F2" : "1.5px solid transparent",
        }}
      >
        <Flex p="lg" mih="100%" align="center" justify="space-between" fw={700}>
          <Text component={Link} to="/" aria-label="Home"  >
            NA<span className="gradient-text">o</span>HR
            <Underline />
          </Text>

          <Group>
            <Group visibleFrom="xs" component="nav" aria-label="Sections">
              {navLinks}
            </Group>

            <ActionIcon
              onClick={toggleScheme}
              variant="subtle"
              color="gray"
              size="lg"
              aria-label={`Switch to ${scheme === "dark" ? "light" : "dark"} theme`}
            >
              {scheme === "dark" ? <IconMoon size={20} /> : <IconSun size={20} />}
            </ActionIcon>

            <Burger
              opened={drawerOpened}
              onClick={drawer.toggle}
              hiddenFrom="xs"
              size="sm"
              aria-label="Open navigation"
            />
          </Group>
        </Flex>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={drawer.close}
        size="70%"
        position="right"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={200}
      >
        <Stack gap="lg">{navLinks}</Stack>
      </Drawer>

      {scrolled && (
        <ActionIcon
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          variant="default"
          radius="xl"
          size="lg"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            border: "2px solid #DA77F2",
            zIndex: 8,
          }}
        >
          <IconArrowBigUpLines size={20} />
        </ActionIcon>
      )}
    </>
  );
};

export default NavbarComponents;
