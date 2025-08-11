
import { Box, Dialog, Flex, Span, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { NavButton } from "../../atoms/button/NavButton";
import { MealLogDialog } from "../layout/MealLogDialog";
import { FieldGroup } from "./FieldGroup";

type Props = {
    mealTime: string;
}

export const MealLogCard: FC<Props> = memo((props) => {
    const { mealTime } = props;
    const [rate, setRate] = useState(5);
    return (
        <Flex bg="yellow.50" borderRadius="md" p={4} shadow="lg" gap={6} w={{base: "350px", md: "750px"}} flexDirection={{base: "column", md: "row"}}>
            <Flex align="center" justify="center" flexDirection={{base: "row", md: "column"}} gap={6}>
                <Text fontWeight="bold" fontSize="xl" p={3} bg="pink.200" borderRadius="full">{mealTime}</Text>
                <MealLogDialog
                    trigger={<NavButton bg="gray.500">編集</NavButton>}
                    date="2025/08/11(月)"
                    title="朝ごはん"
                    body={
                        <VStack bg="yellow.50" gap={16} p={6}>
                            <FieldGroup rate={rate} setRate={setRate} />
                        </VStack>
                    }
                    footer={
                        <Flex align="center" justify="center" gap={{base: 10, md: 100}} w="100%" mb={6}>
                            <Dialog.ActionTrigger asChild>
                                <NavButton px={{base:6, md: 10}} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}} bg="gray.400">キャンセル</NavButton>
                            </Dialog.ActionTrigger>
                            <NavButton bg="pink.500" px={{ base: 6, md: 10 }} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}}>更新する</NavButton>
                        </Flex>
                    }
                />
            </Flex>
            <Box as="ul" minW={{ base: 150, md: 200 }} bg="white" p={2} fontSize="lg" lineHeight="2">
                <li>さつまいも 5g</li>
                <li>ドライフード 25g</li>
                <li>ヤギミルク 1g</li>
            </Box>
            <Flex flexDirection="column" gap={2}>
                <Text fontSize="lg" bg="white" p={3} textAlign="center">
                    完食率：
                    <Span fontWeight="bold">8割</Span>
                </Text>
                <Box bg="white" p={2} w={{base: "auto", md: "350px"}}>
                    <Text fontSize="md"  w="80px" borderBottom="1px solid gray">コメント</Text>
                    <Text pt={2}>脱線しながら食べた</Text>
                </Box>
            </Flex>
        </Flex>
    )
})