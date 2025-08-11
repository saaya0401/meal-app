import { AbsoluteCenter, Box, ProgressCircle, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    percent: number,
    date: string,
}

export const DailyMealCard: FC<Props> = memo((props) => {
    const { percent, date } = props;
    return (
        <Box w={{base: "180px", md: "250px" }} h={{base: "200px", md: "250px" }} bg="white" borderRadius="10px" shadow="md" textAlign="center" p={4} _hover={{cursor: "pointer", opacity: 0.8}}>
            <VStack gap={{base: 3, md: 6}}>
                <Text as="h1" fontSize={{base: "lg", md: "xl"}} fontWeight="bold">{ date }</Text>
                        <Box>
                            <ProgressCircle.Root value={percent} >
                        <ProgressCircle.Circle css={{ "--thickness": {base: "15px", md: "20px"}, "--size": {base: "100px", md: "130px"}}}>
                                    <ProgressCircle.Track />
                                    <ProgressCircle.Range stroke="#4dcfdb" />
                                </ProgressCircle.Circle>
                                <AbsoluteCenter>
                                        <Text fontSize="2xl" fontWeight="bold">
                                            {percent / 10} 割
                                        </Text>
                                </AbsoluteCenter>
                            </ProgressCircle.Root>
                            <Text mt={2} fontWeight="bold">平均完食率</Text>
                        </Box>
                    </VStack>
                </Box>
    )
})