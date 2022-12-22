import { Blockquote, Text, Avatar } from "@mantine/core";
import Underline from "./Underline";
import quotesList from "../../utils/quotes.json";
import { useEffect, useState } from "react";
import { IconRefresh } from '@tabler/icons';
import { Loader } from '@mantine/core';


const Quotes = () => {
    const [quote, setQuote] = useState(quotesList[Math.floor(Math.random() * quotesList.length)])
    const [isDone, setIsDone] = useState(false);
    const [displayQuotesShuffler, setDQS] = useState(true);


    async function typeSentence(sentence: String, eleRef: HTMLElement, delay = 100) {
        setIsDone(false);
        const letters = sentence.split("");
        let i = 0;
        while(i < letters.length) {
          await waitForMs(delay);
          eleRef.textContent += letters[i]
          i++
        }
        setIsDone(true)
        return;
      }
      
      
      function waitForMs(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

    useEffect(()=> {
        const doc = document.getElementById("innerQuotes");
        if(doc){
            doc.textContent = "";
            typeSentence(quote.quote, doc, 50)
        }
      }, [quote])

    useEffect(()=>{
        document.addEventListener("scroll", function(){
            if(window.pageYOffset >= 60){
                setDQS(false)
            }else{
                setDQS(true);
            }
        })
    },[])

    return (
        <>
            <Blockquote cite={`– ${quote.author}`} color={"violet"}>
                <Text fw={400} size="lg" id="innerQuotes" >
                    
                </Text>
                <Underline mtop="10px"/>
            </Blockquote>
            {
                displayQuotesShuffler 
                && 
                <Avatar className={`${isDone ? "pointer" : "progress"}`} style={{position: "absolute", bottom: "10px", right: "10px", border: "2px solid #DA77F2"}} radius={"xl"} onClick={()=> {
                    if(isDone) setQuote(quotesList[Math.floor(Math.random() * quotesList.length)])

                }}>
                    {isDone ? <IconRefresh size={24} /> : <Loader size="sm" color="white" variant="bars" />}
                </Avatar>
            }
        </>
    )
}

export default Quotes;