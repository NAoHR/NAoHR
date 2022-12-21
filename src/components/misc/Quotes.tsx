import { Blockquote, Text } from "@mantine/core";
import Underline from "./Underline";
import quotesList from "../../utils/quotes.json";

const Quotes = () => {
    const quote = quotesList[Math.floor(Math.random() * quotesList.length)];
    
    return (
        <Blockquote cite={`– ${quote.author}`} color={"violet"}>
              <Text fw={400} size="lg" id="innerQuotes">
                {quote.quote}
              </Text>
            <Underline mtop="10px"/>
          </Blockquote>
    )
}

export default Quotes;