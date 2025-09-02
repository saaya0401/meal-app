import { Field, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { MenuListInputs } from "../../molecules/InputFields/MenuListInputs";
import { SliderField } from "../../molecules/InputFields/SliderField";
import { useLogsContext } from "../../../providers/LogsContext";

type Props = {
    error: string | undefined;
}

export const FieldGroup: FC<Props> = memo((props) => {
    const { error } = props;
    const { memoText, setMemoText } = useLogsContext();
    return (
        <>
            <Field.Root required invalid={!!error}>
                <Flex align="center" gap={{base:4 , md: 10}}>
                    <Text fontWeight="bold" minW={{base: "90px" , md: "150px"}} fontSize={{base: "sm" , md: "xl"}}>メニュー</Text>
                    <MenuListInputs />
                </Flex>
                <Field.ErrorText color="red.600" fontSize={{base: "md", md: "xl"}} pt={3}>{error}</Field.ErrorText>
            </Field.Root>
            <Field.Root required>
                <Flex align="center" gap={{base:4 , md: 10}}>
                    <Text fontWeight="bold" minW={{base: "90px" , md: "150px"}} fontSize={{base: "sm" , md: "xl"}}>完食率</Text>
                    <SliderField />
                </Flex>
            </Field.Root>
            <FieldRow label="フリーコメント">
                <Textarea bg="white" minH="80px" w={{ base: "220px", md: "500px" }} fontSize={{ base: "sm", md: "xl" }} lineHeight={1.5} placeholder={`例：最初の一粒だけ手であげると食べ始めた。\n脱線を何度かしていたなど。`} value={ memoText } onChange={(e) => {setMemoText(e.target.value)}} />
            </FieldRow>
        </>
    )
})