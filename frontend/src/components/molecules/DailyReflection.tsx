import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";


export const DailyReflection: FC = memo(() => {
    return (
        <Flex mt={4} gap={{base: 2, md: 8}} justify="left" >
            <Image src="http://localhost/images/koharudiary.png" boxSize={{ base: 130, md: 180 }} />
            <Box w={{base: "230px", md: "550px"}} bg="#bdeacb" mb={5} borderRadius="2xl" p={3}>
                <Text fontWeight="bold" fontSize={{base: "md", md: "xl"}} border="5px solid pink" p={1} mb={2} w="180px">この日の振り返り</Text>
                <Text fontSize="md" lineHeight={1.5} whiteSpace="pre-line">
                    {`朝はさつまいもが安定している。 \n たくさん食べれてえらい！`}
                </Text>
            </Box>
        </Flex>
    )
})