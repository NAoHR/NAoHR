import { Button, Flex, Group, Title } from "@mantine/core";

import stacks from "../utils/stack.json";
import BrandIcon from "./misc/BrandIcon";

const TechStack = () => {
  return (
    <Group>
      <Flex direction="column" gap="lg" align="flex-start" id="stack">
        <Title fw={500} order={3}>
          Tooling System
        </Title>

        <Flex pt={10} gap={8} wrap="wrap" justify="flex-start" align="flex-start">
          {stacks.map((stack) => (
            <Button
              key={stack.name}
              variant="default"
              leftSection={<BrandIcon slug={stack.icon} />}
              style={{ cursor: "default" }}
              component="div"
            >
              {stack.name}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Group>
  );
};

export default TechStack;
