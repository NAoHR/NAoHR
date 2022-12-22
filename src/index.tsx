import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider, ColorSchemeProvider} from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <MantineProvider withGlobalStyles
    theme={{
      colorScheme : "dark",
      globalStyles: (theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
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
        }

      }),
    }}
    >
      <App />
    </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
