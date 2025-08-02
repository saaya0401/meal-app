import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IoMdFemale } from "react-icons/io";

export const Home: FC = memo(() => {
    return (
        <Box minW={{ base: 350, md: 600 , lg: 950 }} maxW={{ base: 1000, lg: 1100 }} justifySelf="center" mx={{ base: 10, lg: 150 }} my={{ base: 6, lg: 30 }}>
            <Grid templateColumns={{ base: "1fr", lg: "auto 1fr auto" }} alignItems="center" gap={{ base: 3, lg: 12 }} bg="white" px={{ base: 5, lg: 20 }} py={5} borderRadius="lg"  boxShadow="lg" >
                <Flex display="flex" alignItems="center" justifyContent="center" justifySelf={{ base: "center", lg: "none" }}>
                    <Image bg="gray.200" borderRadius="full" boxSize={24} src="http://localhost/storage/images/hiyori.jpg" alt="プロフィール画像" objectFit="cover" />
                </Flex>
                <Box>
                <Text fontSize={{base: 30, lg: 38 }} fontWeight="bold" textAlign={{base: "center", lg: "left"}}>ひより ちゃん</Text>
                </Box>
                <Box textAlign="center">
                    <Text fontSize="xl" mb={3} >2025/5/11生まれ</Text>
                    <Flex fontSize="xl" align="center" justify="center" gap={3}>
                        <IoMdFemale />
                        <Text>マルポメ</Text>
                        <Text>2.1kg</Text>
                    </Flex>
                </Box>
            </Grid>
        </Box>
    )
})