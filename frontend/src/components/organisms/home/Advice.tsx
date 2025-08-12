import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

export const Advice: FC = memo(() => {
    return (
        <Flex my={{ base: 10, md: 55, lg: 0 }} justify="space-around" >
            <Image src="http://localhost/images/koharuline.png" boxSize={{ base: 150, md: 250 }} alignSelf={{base: "auto", lg: "flex-end"}}/>
            <Box bg="white" minW={{ base: "50vw", lg: "25vw" }} maxW={{base: "90vw", lg: "30vw"}} p={{base: 2, md: 5}} borderRadius="lg" border="1px solid #aaa" boxShadow="md" wordBreak="break-word">
                <Text fontSize={{ base: "sm", md: "lg", lg: "2xl"}} fontWeight="bold" borderBottom="2px solid #aaa">こはる先生のアドバイス</Text>
                <Text pt={3} fontSize={{base:"sm", md: "xl"}}>次のご飯は・・・・</Text>
            </Box>
        </Flex>
    )
})