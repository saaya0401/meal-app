import { Flex, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useLogsContext } from "../../../providers/LogsContext";
import { FiMinusCircle } from "react-icons/fi";

export const MenuListInputs: FC = memo(() => {
    const { menus, menuChange, menuAdd, menuRemove} = useLogsContext();
    return (
        <VStack spaceY={3} align="start" >
            {menus.map((menu, index) => (
                <Flex key={index} align="center" gap={{ base: 2, md: 5 }} flexDirection={{ base: "column", md: "row" }}>
                    <Flex justify="left" align="center" gap={1}>
                        {menus.length > 1 && (
                            <IconButton onClick={() =>menuRemove(index)} aria-label="削除" size={{base: "2xs", md: "2xs"}} variant="plain" asChild>
                                <FiMinusCircle color="red" />
                            </IconButton>
                        )}
                        <Flex gap={{base:1 , md: 5}} align="center" w="100%">
                            <Input p={2} w="70%" id={`menu-input-${index}`} type="text" fontSize={{base: "sm" , md: "xl"}} placeholder="例：かぼちゃ" bg="white" value={menu.name} onChange={(e) => {menuChange(index, "name", e.target.value)}}/>
                            <Flex align="flex-end" gap={{base:2 , md: 2}} w="25%">
                                <Input p={2} id={`menu-amount-${index}`} fontSize={{base: "sm" , md: "xl"}} bg="white" type="text" value={ menu.amount } onChange={(e) => menuChange(index, "amount", e.target.value)}/>
                                <Text fontSize="lg">g</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    {index === menus.length - 1 && (
                        <IconButton onClick={menuAdd} aria-label="追加" size={{base: "sm", md: "md"}} variant="plain" asChild >
                            <CiCirclePlus color="#ff69c8"/>
                        </IconButton>
                    )}
                </Flex>
            ))}
        </VStack>
    )
})