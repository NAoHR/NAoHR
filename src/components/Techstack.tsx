import { Flex, Group, Title } from "@mantine/core";

import stacks from "../utils/stack.json";
import BrandIcon from "./misc/BrandIcon";

/** Rendering order, roughly from what I write in to what I run it on. */
const GROUP_ORDER = ["Languages", "Frameworks", "Data", "Integration & Ops", "AI"] as const;

const grouped = GROUP_ORDER.map((group) => ({
  group,
  items: stacks.filter((stack) => stack.group === group),
})).filter(({ items }) => items.length > 0);

const TechStack = () => {
  return (
    <Group>
      <Flex direction="column" gap="lg" align="flex-start" id="stack" w="100%">
        <Title fw={500} order={3}>
          Tooling System
        </Title>

        <dl className="stack">
          {grouped.map(({ group, items }) => (
            <div className="stack-group" key={group}>
              <dt className="stack-label">{group}</dt>

              <dd className="stack-items">
                {items.map((stack) => (
                  <span className="stack-chip" key={stack.name}>
                    <span className="stack-chip__icon">
                      <BrandIcon slug={stack.icon} size={16} />
                    </span>
                    {stack.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Flex>
    </Group>
  );
};

export default TechStack;
