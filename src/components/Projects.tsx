import { Title, Text, Flex, Group, Paper, ThemeIcon, Timeline, Image } from '@mantine/core';
import Underline from './misc/Underline';
import projects from "../utils/projects.json";
import { IconCode, IconExternalLink } from '@tabler/icons';
import { useContext } from 'react';
import { ThemeCtx, ThemeCtxInterface } from '../contexts/ThemeContexts';


const Projects = () => {
    const { currentTheme, toggleTheme } = useContext<ThemeCtxInterface>(ThemeCtx);
    
    return (
        <>
        <Group id="projects">
                <Title fw={500} className="unbounded" order={3}>
                    Projects I Have Done
                  <Underline />
                </Title>

                <Text fw={400} size="lg">
                    Here are the latests <span className="glowing glowingT bold">Projects</span> i have made throughout my coding career, 
                    for more please visit my <Text component='a' href="https://github.com" className='glowing glowingT' fw={700} >github</Text>
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
                                        <div
                                        style={{
                                            width: "100%",
                                            height: "220px",
                                            position: "relative"
                                        }}
                                        >
                                            <Image
                                                height={"220px"}
                                                radius="md"
                                                src={v.image}
                                                />
                                            <div 
                                            style={{
                                                position: "absolute",
                                                top : "0px",
                                                width : "100%",
                                                height : "100%",
                                                background: currentTheme === 'dark' ? "rgba(44, 46, 51, 0.6)" : "rgba(248, 249, 250, 0.3)"
                                            }}
                                            ></div>
                                        </div>
                                        <Title order={3}>
                                            {v.title}
                                            <Underline />
                                        </Title>
                                        <Text size={"lg"}>
                                            {v.description}
                                        </Text>
                                        <Flex 
                                        gap={8} 
                                        pt={"sm"}
                                        wrap={"wrap"}
                                        >
                                            {
                                                v.tag.map((v,i ) => {
                                                    return (
                                                        <Text fw={700} size={"sm"} key={i} >
                                                            {v}
                                                        </Text>
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