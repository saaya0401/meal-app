import { Dialog, Flex, Input, Portal, Textarea, VStack } from "@chakra-ui/react";
import { FC, memo, ReactNode, useCallback, useRef, useState } from "react";
import { NavButton } from "../../atoms/button/NavButton";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { SelectField } from "../../molecules/InputFields/SelectField";
import { MenuListInputs } from "../../molecules/InputFields/MenuListInputs";
import { HandleChange, MenuItem } from "../../../types/form";
import { SliderField } from "../../molecules/InputFields/SliderField";
import { useMenus } from "../../../hooks/useMenus";
import { useDatePicker } from "../../../hooks/useDatePicker";
import { FieldGroup } from "../mealLog/FieldGroup";

type Props = {
    triggerDesktop?: ReactNode;
    triggerMobile?: ReactNode;
    selectedMealTime: string | null;
    setSelectedMealTime: (v: string | null) => void;
    resetForm: () => void;
}

export const RecordDialog: FC<Props> = memo((props) => {
    const { triggerMobile, triggerDesktop, selectedMealTime, setSelectedMealTime, resetForm } = props;

    const { inputRef, showPicker } = useDatePicker();

    const mealTimeItems = [
                { label: "朝ごはん", value: "morning" },
                { label: "昼ごはん", value: "noon" },
                { label: "夜ごはん", value: "evening" },
                { label: "その他", value: "other" },
    ];

    const [rate, setRate] = useState(5);
    const handleReset = useCallback(() => {
        resetForm();
        setRate(5);
    }, [resetForm, setRate]);

    return (
        <Dialog.Root placement="center" size={{base:"sm" , md: "xl"}} >
            {triggerMobile && <Dialog.Trigger asChild>{triggerMobile}</Dialog.Trigger>}
            {triggerDesktop && <Dialog.Trigger asChild>{ triggerDesktop }</Dialog.Trigger>}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content p={{ base: 4, md: 6}}>
                        <Dialog.Body p={{ base: 1, md: 5 }}>
                            <VStack gap={{base:6, md: 16}}>
                                <FieldRow label="日付" isRequired={true} errorText="日付を選択してください" >
                                    <Input ref={inputRef} w={{base: "170px", md: "280px"}}  type="date" fontSize={{base: "sm" , md: "xl"}} onClick={showPicker} cursor="pointer"/>
                                </FieldRow>
                                <FieldRow label="食事の時間帯" isRequired={true} errorText="時間帯を選択してください">
                                    <SelectField items={mealTimeItems} value={selectedMealTime} onChange={setSelectedMealTime} />
                                    {selectedMealTime === "other" && (
                                        <Input w={{base: "120px", md: "200px"}} fontSize={{base: "sm" , md: "lg"}} placeholder="詳細"/>
                                    )}
                                </FieldRow>
                                <FieldGroup rate={rate} setRate={setRate} />
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