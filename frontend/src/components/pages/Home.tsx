import { Box, Grid } from "@chakra-ui/react";
import { FC, memo } from "react";
import { PetProfile } from "../organisms/home/PetProfile";
import { LatestMeal } from "../organisms/mealLog/LatestMeal";
import { Advice } from "../organisms/home/Advice";

export const Home: FC = memo(() => {
    return (
        <>
            <PetProfile />
            <Box  mx={{ base: 2, md: 50 }} my={{base:12, md: 59, lg: 100}}>
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} >
                    <LatestMeal />
                    <Advice />
                </Grid>
            </Box>
        </>
    )
})