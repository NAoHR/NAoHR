import { Text, Center } from "@mantine/core"
import {IconHeart} from "@tabler/icons";

const Footer = () => {
    return (
        <>
            <Center fw={700}>
                <Text>
                    Made With 
                </Text>
                <Text pl={"xs"} pr={"xs"} className="glowing glowingT">
                    <IconHeart size={18} />
                </Text>
                <Text>
                    by Najmi
                </Text>
            </Center>
        </>
    )
}

export default Footer