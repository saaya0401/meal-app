import { Box, Flex, Heading, Table, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { NavButton } from "../../atoms/button/NavButton";

type Props = {
    onClick : () => void;
}

export const LatestMeal: FC<Props> = memo((props) => {
    const { onClick } = props;
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
                            <Table.Cell fontSize="md" >6/10</Table.Cell>
                            <Table.Cell fontSize="md" >朝</Table.Cell>
                            <Table.Cell fontSize="sm" >
                                <Flex direction="column" gap={1} >
                                    <Text>さつまいも</Text>
                                    <Text>ドライフード</Text>
                                    <Text>ヤギミルク</Text>
                                </Flex>
                            </Table.Cell>
                            <Table.Cell fontSize="md">8割</Table.Cell>
                        </Table.Row >
                        <Table.Row >
                            <Table.Cell colSpan={4} p={1} py={{base: 1, md: 3}}>
                                <Flex justify="center">
                                    <NavButton bg="teal.400" onClick={onClick} w="30%">詳細</NavButton>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    )
})