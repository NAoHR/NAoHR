import { 
    Title, Flex, 
    Group, Button, 
    Text, Avatar 
  } from "@mantine/core";
import Underline from "./misc/Underline";

import stacks from "../utils/stack.json";


const TechStack = () => {
    return (
        <>
        <Group>
            <Flex
            direction={"column"}
            gap="lg"
            align={"flex-start"}
            id="stack"
            >
                <Title fw={500} className="unbounded" order={3}>
                    My Beloved Tech Stack
                  <Underline />
                </Title>

              <Text fw={400} size="lg">
                Here are <span className="glowing glowingT bold">Tech Stack</span> i have experience of using.
                <Flex
                pt={30}
                gap={8}
                wrap="wrap"
                justify={"flex-start"}
                align="flex-start"
                >
                    {
                        stacks.map((v, i) => {
                            return (
                                <Button key={i}
                                variant="filled"
                                color={"violet.5"}
                                leftIcon={<Avatar src={v.image} size={20} />}
                                >                      
                                    {v.name}
                                </Button>
                            )
                        })
                    }

                </Flex>

              </Text>
            </Flex>

          </Group>
        </>
    )
}

export default TechStack;