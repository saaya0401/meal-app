import { Box, Grid } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { PetProfile } from "../organisms/home/PetProfile";
import { LatestMeal } from "../organisms/mealLog/LatestMeal";
import { Advice } from "../organisms/home/Advice";
import { useHomeData } from "../../hooks/useHomeData";

export const Home: FC = memo(() => {
    const { getData, data } = useHomeData();
    useEffect(() => { getData() }, [])
    const petProfile = data?.profile
    const latestMeal = data?.meal_log
    return (
        <>
            <PetProfile profile={petProfile} />
            <Box  mx={{ base: 2, md: 50 }} my={{base:10, md: 58, lg: 100}}>
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gapY={2}>
                    <LatestMeal latestMeal={latestMeal} onUpdated={getData} />
                    <Advice />
                </Grid>
            </Box>
        </>
    )
})