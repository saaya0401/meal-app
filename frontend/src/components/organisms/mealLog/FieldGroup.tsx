import { Input, Textarea, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { SelectField } from "../../molecules/InputFields/SelectField";
import { MenuListInputs } from "../../molecules/InputFields/MenuListInputs";
import { SliderField } from "../../molecules/InputFields/SliderField";
import { useDatePicker } from "../../../hooks/useDatePicker";
import { useMenus } from "../../../hooks/useMenus";

type Props = {
    rate: number;
    setRate: (v: number) => void;
}

export const FieldGroup: FC<Props> = memo((props) => {
    const { rate, setRate} = props;
    const { menus, menuChange, menuAdd } = useMenus();

    return (
        <>
            <FieldRow label="メニュー" isRequired={true} errorText="メニューを入力してください">
                <MenuListInputs menus={menus} onAdd={menuAdd} onChange={menuChange} />
            </FieldRow>
            <FieldRow label="完食率" isRequired={true}>
                <SliderField rate={rate} setRate={setRate} />
            </FieldRow>
            <FieldRow label="フリーコメント">
                <Textarea bg="white" minH="80px" w={{ base: "220px", md: "500px" }} fontSize={{ base: "sm", md: "xl" }} placeholder={`例：最初の一粒だけ手であげると食べ始めた。\n脱線を何度かしていたなど。`}>
                </Textarea>
            </FieldRow>
        </>
    )
})