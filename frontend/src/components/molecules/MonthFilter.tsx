import { Field, Flex, Input } from "@chakra-ui/react";
import { FC, memo } from "react";
import { NavButton } from "../atoms/button/NavButton";
import { useDatePicker } from "../../hooks/useDatePicker";

type Props = {
    value: string;
    onChange: (v: string) => void;
    onReset: () => void;
}

export const MonthFilter: FC<Props> = memo((props) => {
    const { value, onChange, onReset, } = props;
    const { inputRef, showPicker } = useDatePicker();
    return (
        <Flex align="center" justify="center" my={10} gap={{base: 4, md: 14}}>
            <Field.Root w="200px" bg="white" border="1px solid gray" borderRadius="md" >
                <Input ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)} type="month" h={{base: 10, md: 14}} onClick={showPicker} cursor="pointer" fontSize="xl"/>
            </Field.Root>
            <Flex gap={{base: 2, md: 6}} align="center">
                <NavButton bg="#8ac982" fontSize={{base: "sm", md: "lg"}} py={{base: "8px", md: "16px"}} px={{base: "8px", md: "20px"}}>絞り込み</NavButton>
                <NavButton bg="gray.400" fontSize={{base: "sm", md: "lg"}} py={{base: "8px", md: "16px"}} px={{base: "8px", md: "20px"}} onClick={onReset}>リセット</NavButton>
            </Flex>
        </Flex>
    )
})