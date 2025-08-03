import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IoMdFemale } from "react-icons/io";

export const PetProfile: FC = memo(() => {
    return (
        <Box minW={{ base: 350, md: 600 , lg: 950 }} maxW={{ base: 1000, lg: 1100 }} justifySelf="center" mx={{ base: 10, lg: 100 }} my={{ base: 8,  md: 50, lg: 100 }}>
            <Grid templateColumns={{ base: "auto 1fr", lg: "auto 1fr auto" }} alignItems="center" gap={{ base: 1, md: 10, lg: 12 }} bg="white" px={{ base: 4, lg: 20 }} py={5} borderRadius="lg"  boxShadow="lg" >
                <Flex display="flex" alignItems="center" justifyContent="center" >
                    <Image bg="gray.200" borderRadius="full" boxSize={{base:24, lg: 32}} src="http://localhost/storage/images/hiyori.jpg" alt="プロフィール画像" objectFit="cover" />
                </Flex>
                <Flex flexDirection={{base: "column", md: "row"}} justify="space-between" align="center" gap={3}>
                    <Box>
                        <Text fontSize={{base: 20, md: 30, lg: 38 }} fontWeight="bold" textAlign={{base: "center", lg: "left"}}>ひより ちゃん</Text>
                    </Box>
                    <Box textAlign="center" maxW={ 200 }  fontSize={{base: "md", md: "xl" }}>
                        <Text mb={{base: 1, lg: 3}} >2025/5/11生まれ</Text>
                        <Flex align="center" justify="left" gap={10} flexWrap="wrap">
                            <IoMdFemale color="red" size={26} />
                            <Text>2.1kg</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Grid>
        </Box>
    )
})