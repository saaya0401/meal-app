
import { Box, Flex, Span, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { NavButton } from "../../atoms/button/NavButton";
import { MenuItem } from "../../../types/form";
import { HydratePayload } from "../../../hooks/useLogs";
import { MealTime } from "../../../types/homeData";

type Props = {
    mealTime: MealTime;
    mealTimeNote: string | null;
    menu: MenuItem[];
    amountPercent: string;
    memo: string | null;
    onClick: () => void;
}

export const MealLogCard: FC<Props> = memo((props) => {
    const { mealTime, mealTimeNote, menu, amountPercent, memo, onClick} = props;

    return (
        <Flex bg="yellow.50" borderRadius="md" p={4} shadow="lg" gap={6} w={{base: "350px", md: "750px"}} flexDirection={{base: "column", md: "row"}}>
            <Flex align="center" justify="center" flexDirection={{base: "row", md: "column"}} gap={6}>
                <Text textAlign="center" fontWeight="bold" fontSize={{ base: "md", md: "xl" }} w={{ base: "auto", md: 104}} p={{base: 2, md: 3}} bg="pink.200" borderRadius="full">{mealTimeNote ? mealTimeNote : mealTime }</Text>
                <NavButton px={{ base: 4, md: 5 }} py={{ base: 2, md: 3 }} fontSize={{ base: "md", md: "xl" }} onClick={onClick} bg="gray.500">編集</NavButton>
            </Flex>
            <Box as="ul" minW={{ base: 150, md: 200 }} bg="white" p={2} fontSize={{base: "md", md: "lg"}} lineHeight="2">
                {menu.map((m, idx) => (
                    <li key={`${m.name}-${idx}`}>{m.name} { m.amount }</li>
                ))}
            </Box>
            <Flex flexDirection="column" gap={2}>
                <Text fontSize="lg" bg="white" p={3} textAlign="center">
                    完食率：
                    <Span fontWeight="bold">{ amountPercent }</Span>
                </Text>
                <Box bg="white" p={2} w={{base: "auto", md: "350px"}}>
                    <Text fontSize="md"  w="80px" borderBottom="1px solid gray">コメント</Text>
                    <Text pt={2}>{ memo }</Text>
                </Box>
            </Flex>
        </Flex>
    )
})