import { Title, Text, Flex, Group, Paper, ThemeIcon, Timeline } from '@mantine/core';
import Underline from './misc/Underline';
import projects from "../utils/projects.json";
import { IconCode, IconExternalLink } from '@tabler/icons';


const Projects = () => {
    
    return (
        <>
        <Group id="projects">
                <Title fw={500} className="unbounded" order={3}>
                    Projects I Have Done
                  <Underline />
                </Title>

                <Text fw={400} size="lg">
                    Here are <span className="glowing glowingT bold">Projects</span> i have made throughout my coding career, for more please visit my <Text component='a' href="https://github.com" className='glowing glowingT' fw={700} >github</Text>
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
                                        <Text size={"lg"}>
                                            {v.description}
                                        </Text>
                                        <Flex gap={8} pt={"sm"}>
                                            {
                                                v.tag.map((v,i ) => {
                                                    return (
                                                        <span style={{borderRadius: "3px"}} key={i}>
                                                            <Text fw={500} size={"sm"}>
                                                                {v}
                                                                <Underline st={true} w="100%" />
                                                            </Text>
                                                        </span>
                                                    )
                                                })
                                            }
                                        </Flex>
                                        <Text component='a' href={v.link} fw={700} size={"lg"} style={{alignSelf: "flex-end"}} target="_blank" >
                                            Visit <IconExternalLink size={20} />
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