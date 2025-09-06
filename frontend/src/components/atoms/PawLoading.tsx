import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { PiPawPrintFill } from "react-icons/pi";

type Props = {
    text: string;
}

export const PawLoading: FC<Props> = memo((props) => {
    const { text } = props;
        return (
            <Flex align="center" justify="center"gap={2}>
                <Text color="white" fontWeight="bold">{ text }</Text>
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="0s" boxSize="5" aria-hidden />
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="0.5s" boxSize="5" aria-hidden />
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="1s" boxSize="5" aria-hidden />
            </Flex>
        )
    })