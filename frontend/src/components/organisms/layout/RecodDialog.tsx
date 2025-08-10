import { Dialog, Flex, Input, Portal, Textarea, VStack } from "@chakra-ui/react";
import { FC, memo, ReactNode, useRef, useState } from "react";
import { NavButton } from "../../atoms/button/NavButton";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { SelectField } from "../../molecules/InputFields/SelectField";
import { MenuListInputs } from "../../molecules/InputFields/MenuListInputs";
import { HandleChange, MenuItem } from "../../../types/form";
import { SliderField } from "../../molecules/InputFields/SliderField";

type Props = {
    triggerDesktop?: ReactNode;
    triggerMobile?: ReactNode;
    selectedMealTime: string | null;
    setSelectedMealTime: (v: string | null) => void;
    menus: MenuItem[];
    handleAdd: () => void;
    handleChange: HandleChange;
    resetForm: () => void;
}

export const RecordDialog: FC<Props> = memo((props) => {
    const { triggerMobile, triggerDesktop, selectedMealTime, setSelectedMealTime, menus, handleAdd, handleChange, resetForm } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        if (inputRef.current) {
            if ("showPicker" in inputRef.current) {
                (inputRef.current as any).showPicker();
            }
        }
    }
    const mealTimeItems = [
            { label: "朝ごはん", value: "morning" },
            { label: "昼ごはん", value: "noon" },
            { label: "夜ごはん", value: "evening" },
            { label: "その他", value: "other" },
    ];

    const [rate, setRate] = useState(5);
    const handleReset = () => {
        resetForm();
        setRate(5);
    }

    return (
        <Dialog.Root placement="center" size={{base:"sm" , md: "xl"}} >
            {triggerMobile && <Dialog.Trigger asChild>{triggerMobile}</Dialog.Trigger>}
            {triggerDesktop && <Dialog.Trigger asChild>{ triggerDesktop }</Dialog.Trigger>}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content p={{ base: 4, md: 6}}>
                        <Dialog.Body p={{base: 1, md: 5}}>
                            <VStack gap={{base:6, md: 16}}>
                                <FieldRow label="日付" isRequired={true} errorText="日付を選択してください" >
                                    <Input ref={inputRef} w={{base: "170px", md: "280px"}}  type="date" fontSize={{base: "sm" , md: "xl"}} onClick={handleClick} cursor="pointer"/>
                                </FieldRow>
                                <FieldRow label="食事の時間帯" isRequired={true} errorText="時間帯を選択してください">
                                    <SelectField items={mealTimeItems} value={selectedMealTime} onChange={setSelectedMealTime} />
                                    {selectedMealTime === "other" && (
                                        <Input w={{base: "120px", md: "200px"}} fontSize={{base: "sm" , md: "lg"}} placeholder="詳細"/>
                                    )}
                                </FieldRow>
                                <FieldRow label="メニュー" isRequired={true} errorText="メニューを入力してください">
                                    <MenuListInputs menus={menus} onAdd={handleAdd} onChange={handleChange} />
                                </FieldRow>
                                <FieldRow label="完食率" isRequired={true}>
                                    <SliderField rate={rate} setRate={setRate} />
                                </FieldRow>
                                <FieldRow label="フリーコメント">
                                    <Textarea minH="80px" w={{ base: "220px", md: "500px" }} fontSize={{ base: "sm", md: "xl" }} placeholder={`例：最初の一粒だけ手であげると食べ始めた。\n脱線を何度かしていたなど。`}>
                                    </Textarea>
                                </FieldRow>
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer >
                            <Flex align="center" justify="center" gap={{base: 10, md: 100}} w="100%" mt={6}>
                                <Dialog.ActionTrigger asChild>
                                    <NavButton px={{base:6, md: 10}} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}} onClick={handleReset} bg="gray.400">キャンセル</NavButton>
                                </Dialog.ActionTrigger>
                                <NavButton bg="pink.500" px={{ base: 6, md: 10 }} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}}>記録する</NavButton>
                            </Flex>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})