import { Box, Flex, Grid, Heading, Table, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { MealLogDialog } from "../layout/MealLogDialog";
import { MealLog } from "../../../types/homeData";

type Props = {
    latestMeal: MealLog | null | undefined;
    onUpdated?: () => void;
}

export const LatestMeal: FC<Props> = memo((props) => {
    const { latestMeal, onUpdated } = props;

    return (
        <Box bg="orange.200" borderRadius="lg" boxShadow="md" mr={{lg: 20}} px={{ base: 2, md: 5 }} py={{base:6, lg:8}}  >
            <Heading as="h1" mb={ 2 } fontSize={{base: "xl", md: 26}}>最新のごはん記録</Heading>
            <Box bg="white">
                <Table.Root variant="outline" size="md" w="100%">
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell w="30%" fontWeight="bold" bg="gray.50">日付</Table.Cell>
                            <Table.Cell>{latestMeal?.formattedDate}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell w="30%" fontWeight="bold" bg="gray.50">時間帯</Table.Cell>
                            <Table.Cell>{latestMeal?.meal_time_note ?? latestMeal?.meal_time}</Table.Cell>
                        </Table.Row>
                        <Table.Row verticalAlign="top">
                            <Table.Cell w="30%" fontWeight="bold" bg="gray.50">メニュー</Table.Cell>
                            <Table.Cell>
                                <Flex direction="column" gap={1}>
                                    {latestMeal?.menu.map((item) => (
                                        <Text key={item.name}>{item.name}</Text>
                                    ))}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell w="30%" fontWeight="bold" bg="gray.50">完食率</Table.Cell>
                            <Table.Cell>{latestMeal?.amount_percent}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
                <Flex justify="center" p={2}>
                    <MealLogDialog
                        date={latestMeal?.date}
                        formattedDate={latestMeal?.formattedDate}
                        dailyLogTrigger={
                            latestMeal && (<Box borderRadius="md" _hover={{opacity: 0.8, cursor: "pointer"}} color="white" fontWeight="bolder" px={{base:5, md: 10}} py={{ base: 2, md: 3}} fontSize={{base: "md", md: "xl"}} bg="teal.400">詳細</Box>)
                        }
                        onUpdated={onUpdated}
                    />
                </Flex>
            </Box>
        </Box>
    )
})