import { useEffect, useRef, useState } from "react";
import { Blockquote, Text } from "@mantine/core";
import { IconPodium } from "@tabler/icons-react";

import quotesList from "../../utils/quotes.json";

/** How long a finished quote stays on screen before the next one starts. */
const HOLD_MS = 5000;

/** Delay between typed letters. */
const LETTER_MS = 50;

const randomQuote = () => quotesList[Math.floor(Math.random() * quotesList.length)];

const waitForMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Quotes = () => {
  // Deterministic on the first render. Picking at random during render makes
  // the server and the client disagree on the cite text, and React treats a
  // hydration text mismatch as fatal (#418) — the whole island then fails to
  // hydrate and nothing on the page is interactive.
  const [quote, setQuote] = useState(quotesList[0]);
  const [typed, setTyped] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Randomise once we are safely on the client.
  useEffect(() => {
    setQuote(randomQuote());
  }, []);

  // Bumped on every quote change and on unmount, so a still-running
  // typewriter aborts itself instead of interleaving with the next one.
  const runIdRef = useRef(0);

  // Type the current quote out letter by letter.
  useEffect(() => {
    const runId = ++runIdRef.current;

    if (prefersReducedMotion()) {
      setTyped(quote.quote);
      setIsDone(true);
      return;
    }

    setTyped("");
    setIsDone(false);

    (async () => {
      for (const letter of quote.quote) {
        await waitForMs(LETTER_MS);
        if (runIdRef.current !== runId) return;
        setTyped((prev) => prev + letter);
      }
      setIsDone(true);
    })();

    return () => {
      runIdRef.current++;
    };
  }, [quote]);

  // Once it has finished typing, hold for a beat and move to the next quote.
  // Skipped under reduced motion, where content should not swap on its own.
  useEffect(() => {
    if (!isDone || prefersReducedMotion()) return;

    const id = setTimeout(() => {
      setQuote((current) => {
        let next = randomQuote();
        // Never follow a quote with itself — that reads as a stall.
        while (quotesList.length > 1 && next.quote === current.quote) next = randomQuote();
        return next;
      });
    }, HOLD_MS);

    return () => clearTimeout(id);
  }, [isDone]);

  return (
    <Blockquote color="violet" cite={`– ${quote.author}`} icon={<IconPodium />} mt="sm" w="100%">
      <Text fw={400} size="lg">
        {typed}
        {!isDone && <span aria-hidden="true">▌</span>}
      </Text>
    </Blockquote>
  );
};

export default Quotes;
