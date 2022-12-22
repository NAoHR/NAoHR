import { Title, Text, Flex, Group, Paper, ThemeIcon, Timeline } from '@mantine/core';
import Underline from './misc/Underline';
import projects from "../utils/projects.json";
import { IconCode } from '@tabler/icons';


const Projects = () => {
    
    return (
        <>
        <Group>
                <Title fw={500} className="unbounded" order={3}>
                    My Beloved Tech Stack
                  <Underline />
                </Title>

                <Text fw={400} size="lg">
                    Here are <span className="glowing glowingT bold">Tech Stack</span> i have experienced of using. I am currently on MENN Stack (MongoDB, ExpressJS, NodeJs, NextJS).
                </Text>


            <div>
                <Timeline>
                    {
                        projects.map((v,i) => {
                            return (
                            <Timeline.Item 
                            key={i}
                            bulletSize={24}
                            bullet={
                                <ThemeIcon
                                size={25}
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'grape' }}
                                radius="xl"
                                >
                                <IconCode size={14} />
                                </ThemeIcon>
                            }>
                                <Paper radius={"sm"} >
                                    <Flex direction={"column"} justify="flex-start" gap={"xs"} align={"flex-start"}>
                                        <Title order={3}>
                                            {v.title}
                                            <Underline st={true} w="35px"/>
                                        </Title>
                                        <Text size={"md"}>
                                            {v.description}
                                        </Text>
                                        <Text component='a' href={v.link} fw={700}>
                                            Visit
                                        </Text>
                                    </Flex>
                                </Paper>
                            </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
            </div>
          </Group>
        </>
    )
}

export default Projects;