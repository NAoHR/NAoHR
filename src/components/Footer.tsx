import { Center, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Center component="footer" fw={700} pb="xl">
      <Text>Made with</Text>
      <Text pl="xs" pr="xs" c="pink" component="span" aria-label="love">
        <IconHeart size={18} />
      </Text>
      <Text>by Najmi</Text>
    </Center>
  );
};

export default Footer;
