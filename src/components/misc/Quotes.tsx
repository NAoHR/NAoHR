import { Blockquote, Text } from "@mantine/core";
import Underline from "./Underline";
import { useEffect, useState } from "react";
import quotesList from "../../utils/quotes.json";

const Quotes = () => {
    const quote = quotesList[Math.floor(Math.random() * quotesList.length)]

    return (
        <Blockquote cite={`– ${quote.author}`} color={"violet"}>
              <Text fw={400} size="lg">
                {quote.quote}
              </Text>
            <Underline mtop="10px"/>
          </Blockquote>
    )
}

export default Quotes;