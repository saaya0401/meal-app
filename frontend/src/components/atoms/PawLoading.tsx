import { Box, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import { PiPawPrintFill } from "react-icons/pi";

export const PawLoading = memo(() => {
        return (
            <Flex align="center" justify="center"gap={2}>
                <Text color="white" fontWeight="bold">考え中</Text>
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="0s" boxSize="5" aria-hidden />
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="0.5s" boxSize="5" aria-hidden />
                <Box as={PiPawPrintFill} animation="pawBounce" animationDelay="1s" boxSize="5" aria-hidden />
            </Flex>
        )
    })