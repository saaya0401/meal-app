import { Box, Flex, Grid, Image, Span, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { Profile } from "../../../types/homeData";

type Props = {
    profile: Profile | null | undefined;
}

export const PetProfile: FC<Props> = memo((props) => {
    const { profile } = props;
    return (
        <Box minW={{ base: 350, md: 600 , lg: 950 }} maxW={{ base: 1000, lg: 1100 }} justifySelf="center" mx={{ base: 10, lg: 100 }} my={{ base: 8,  md: 50, lg: 100 }}>
            <Grid templateColumns={{ base: "auto 1fr", lg: "auto 1fr auto" }} alignItems="center" gap={{ base: 1, md: 10, lg: 12 }} bg="white" px={{ base: 4, lg: 20 }} py={5} borderRadius="lg"  boxShadow="lg" >
                <Flex display="flex" alignItems="center" justifyContent="center" >
                    <Image bg="gray.200" borderRadius="full" boxSize={{ base: 24, lg: 32 }} src={profile?.image ? `http://localhost/storage/${profile.image}` : undefined} alt="プロフィール画像" objectFit="cover" />
                </Flex>
                <Flex flexDirection={{base: "column", md: "row"}} justify="space-between" align="center" gap={3}>
                    <Box>
                        <Text fontSize={{ base: 20, md: 30, lg: 38 }} fontWeight="bold" textAlign={{ base: "center", lg: "left" }}>{ profile?.name } ちゃん</Text>
                    </Box>
                    <Box textAlign="center" maxW={ 200 }  fontSize={{base: "md", md: "xl" }}>
                        <Text mb={{ base: 1, lg: 3 }} >
                            {profile?.birthdate}
                            <Span ml={3}>生まれ</Span>
                        </Text>
                        <Flex align="center" justify="left" gap={10} flexWrap="wrap">
                            {profile?.gender === "female" && (
                                <IoMdFemale color="red" size={26} />
                            )}
                            {profile?.gender === "male" && (
                                <IoMdMale color="blue" size={26} />
                            )}
                            <Text>
                                {profile?.weight_kg}
                                <Span ml={3}>kg</Span>
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Grid>
        </Box>
    )
})