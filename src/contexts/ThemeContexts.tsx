import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import {MantineProvider} from "@mantine/core";

interface Props {
    children: ReactNode
}

type ThemeType = "dark" | "light"


export interface ThemeCtxInterface {
    toggleTheme : Dispatch<SetStateAction<ThemeType>>;
    currentTheme: "dark" | "light";
}


const defaultProps: ThemeCtxInterface = {
    toggleTheme : () => {},
    currentTheme: "dark"
}

export const ThemeCtx = createContext<ThemeCtxInterface>(defaultProps);

const Theme = (props: Props) => {
    const [theme, setTheme] = useState<ThemeType>("dark");

    return (
        <ThemeCtx.Provider value={{toggleTheme: setTheme, currentTheme: theme}}>
            <MantineProvider withGlobalStyles
            theme={{
            colorScheme : theme,
            globalStyles: (theme) => ({
                '*, *::before, *::after': {
                boxSizing: 'border-box',
                },

                body: {
                ...theme.fn.fontStyles(),
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[4],
                lineHeight: theme.lineHeight,
                },

                ".unbounded" : {
                fontFamily : "Unbounded, cursive;"
                },
                ".glowing" : {
                background: "-webkit-linear-gradient(45deg, #E64980, #4C6EF5)",
                },
                ".bold" : {
                fontWeight: 700
                },
                ".glowingT" : {
                backgroundClip: "text",
                WebkitBackgroundClip : "text",
                WebkitTextFillColor: "transparent"
                },
                ".bottomBorderPurple" : {
                    borderBottom: ".5px solid #DA77F2"
                },
                "a" : {
                    color: "inherit", /* blue colors for links too */
                    textDecoration: "inherit" /* no underline */
                }
            }),
            }}
            >
                {props.children}
            </MantineProvider>
        </ThemeCtx.Provider>
    )
}

export default Theme;