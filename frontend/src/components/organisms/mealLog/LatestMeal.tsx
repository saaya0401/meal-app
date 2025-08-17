import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { NavButton } from "../../atoms/button/NavButton";
import { MealLogDialog } from "../layout/MealLogDialog";
import { MealLog } from "../../../types/homeData";

type Props = {
    latestMeal: MealLog | null|undefined;
}

export const LatestMeal: FC<Props> = memo((props) => {
    const { latestMeal } = props;
    return (
        <Box bg="orange.200" borderRadius="lg" boxShadow="md" mr={{lg: 20}} px={{ base: 2, md: 5 }} py={{base:4, lg:8}}  >
            <Heading as="h1" mb={ 2 } fontSize={{base: "xl", md: 26}}>最新のごはん記録</Heading>
            <Box bg="white">
                <Table.Root >
                    <Table.Header>
                        <Table.Row >
                            <Table.ColumnHeader fontWeight="bold" fontSize={{ base: "md", md: "lg" }} py={{base: 3, lg: 5}}>日付</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bold" fontSize={{base: "md", md: "lg"}} py={{base: 3, lg: 5}}>時間帯</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bold" fontSize={{base: "md", md: "lg"}} py={{base: 3, lg: 5}}>メニュー</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bold" fontSize={{base: "md", md: "lg"}} py={{base: 3, lg: 5}}>完食率</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        <Table.Row>
                            <Table.Cell fontSize="md" >{ latestMeal?.date }</Table.Cell>
                            <Table.Cell fontSize="md" >{ latestMeal?.meal_time_note ? latestMeal.meal_time_note : latestMeal?.meal_time }</Table.Cell>
                            <Table.Cell fontSize="sm" >
                                <Flex direction="column" gap={1} >
                                    {latestMeal?.menu.map((item) => {
                                        return <Text key={item.name}>{item.name}</Text>
                                    })}
                                </Flex>
                            </Table.Cell>
                            <Table.Cell fontSize="md">{ latestMeal?.amount_percent}</Table.Cell>
                        </Table.Row >
                        <Table.Row >
                            <Table.Cell colSpan={4} p={1} py={{base: 1, md: 3}}>
                                <Flex justify="center">
                                    <MealLogDialog
                                        date="2025/08/11(月)"
                                        dailyLogTrigger={
                                        <NavButton px={{base:5, md: 10}} py={{ base: 2, md: 3}} fontSize={{base: "sm", md: "xl"}} bg="teal.400">詳細</NavButton>
                                    } />
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    )
})