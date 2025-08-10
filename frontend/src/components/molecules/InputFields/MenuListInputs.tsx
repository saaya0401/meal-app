import { Flex, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { HandleChange, MenuItem } from "../../../types/form";

type Props = {
    menus: MenuItem[];
    onAdd: () => void;
    onChange: HandleChange;
}

export const MenuListInputs: FC<Props> = memo((props) => {
    const { menus, onChange, onAdd } = props;

    return (
        <VStack spaceY={3} align="start" >
            {menus.map((menu, index) => (
                <Flex align="center" gap={{base: 2, md: 5}} flexDirection={{base: "column", md: "row"}}>
                    <Flex key={index} gap={{base:2 , md: 5}} align="center">
                        <Input type="text" fontSize={{base: "sm" , md: "xl"}} placeholder="例：かぼちゃ" w={{base: "170px", md: "280px"}} value={menu.name} onChange={(e) => onChange(index, "name", e.target.value)}/>
                        <Flex align="flex-end" gap={{base:2 , md: 2}}>
                            <Input w={{base: "20px", md: "65px"}} fontSize={{base: "sm" , md: "xl"}} type="text" value={ menu.amount } onChange={(e) => onChange(index, "amount", e.target.value)}/>
                            <Text fontSize="lg">g</Text>
                        </Flex>
                    </Flex>
                    {index === menus.length - 1 && (
                        <IconButton onClick={onAdd} aria-label="追加" size={{base: "sm", md: "md"}} variant="plain" asChild >
                            <CiCirclePlus    color="#ff69c8"/>
                        </IconButton>
                    )}
                </Flex>
            ))}
        </VStack>
    )
})