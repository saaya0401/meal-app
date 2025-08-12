import { Textarea } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { MenuListInputs } from "../../molecules/InputFields/MenuListInputs";
import { SliderField } from "../../molecules/InputFields/SliderField";

export const FieldGroup: FC = memo(() => {
    return (
        <>
            <FieldRow label="メニュー" isRequired={true} errorText="メニューを入力してください">
                <MenuListInputs />
            </FieldRow>
            <FieldRow label="完食率" isRequired={true}>
                <SliderField />
            </FieldRow>
            <FieldRow label="フリーコメント">
                <Textarea bg="white" minH="80px" w={{ base: "220px", md: "500px" }} fontSize={{ base: "sm", md: "xl" }} lineHeight={1.5} placeholder={`例：最初の一粒だけ手であげると食べ始めた。\n脱線を何度かしていたなど。`}>
                </Textarea>
            </FieldRow>
        </>
    )
})