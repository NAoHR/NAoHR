import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import poetList from "../utils/poet.json";

const NotFound = () => {
  const poem = poetList[Math.floor(Math.random() * poetList.length)];

  return (
    <Container size="lg" h="100dvh" maw="800px">
      <Flex mih="100%" miw="100%" direction="column" justify="center" align="center" gap="md">
        <Title order={1} fw={700}>
          404
        </Title>
        <Text ta="center">{poem}</Text>
        <Button component={Link} to="/" variant="subtle" color="violet" mt="md">
          Take me home
        </Button>
      </Flex>
    </Container>
  );
};

export default NotFound;
