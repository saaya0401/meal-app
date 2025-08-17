import { Box, Grid } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { PetProfile } from "../organisms/home/PetProfile";
import { LatestMeal } from "../organisms/mealLog/LatestMeal";
import { Advice } from "../organisms/home/Advice";
import { useData } from "../../hooks/useHomeData";

export const Home: FC = memo(() => {
    const { getData, data } = useData();
    useEffect(() => { getData() }, [])
    const petProfile = data?.profile
    console.log(data);
    const latestMeal = data?.meal_log
    return (
        <>
            <PetProfile profile={petProfile} />
            <Box  mx={{ base: 2, md: 50 }} my={{base:12, md: 59, lg: 100}}>
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} >
                    <LatestMeal latestMeal={latestMeal} />
                    <Advice />
                </Grid>
            </Box>
        </>
    )
})