import { Dialog, Flex, Image, Input, Portal,  VStack } from "@chakra-ui/react";
import { FC, memo, ReactNode, useCallback, useEffect, useState } from "react";
import { FieldRow } from "../../molecules/InputFields/FieldRow";
import { SelectField } from "../../molecules/InputFields/SelectField";
import { useDatePicker } from "../../../hooks/useDatePicker";
import { FieldGroup } from "../mealLog/FieldGroup";
import { useLogs } from "../../../hooks/useLogs";
import { NavButton } from "../../atoms/button/NavButton";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import { useLogsContext } from "../../../providers/LogsContext";

type Props = {
    triggerDesktop?: ReactNode;
    triggerMobile?: ReactNode;
}

export const AddLogDialog: FC<Props> = memo((props) => {
    const { triggerMobile, triggerDesktop } = props;
    const [submitting, setSubmitting] = useState(false);
    const { inputRef, showPicker } = useDatePicker();
    const { selectedMealTime,  mealTimeNote, setMealTimeNote, resetForm, rate, menus, memoText, date, setDate } = useLogsContext();
    const { errors, validateLogInput, } = useError();

    const handleSubmit = useCallback(async () => {

        if (!validateLogInput(date, selectedMealTime, menus)) {
            return;
        }
        const payload = {
            profile_id: 1,
            date,
            meal_time: selectedMealTime,
            meal_time_note: selectedMealTime === "other" ? mealTimeNote : null,
            menu: menus.map(m => ({
                ...m,
                amount: `${m.amount}g`
            })),
            amount_percent: `${rate}割`,
            memo: memoText
        }
        console.log(payload);
        try {
            setSubmitting(true);
            const axiosInstance = axios.create({
                baseURL: "http://localhost:8000",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await axiosInstance.post("http://localhost/api/meal-logs", payload, );
            resetForm();
            console.log("送信成功");
        } catch (err) {
            console.log("送信失敗");
        } finally {
            setSubmitting(false);
        }
    }, [date, selectedMealTime, mealTimeNote, menus, rate, memoText]);

    return (
        <Dialog.Root placement="center" size={{base:"sm" , md: "xl"}} >
            {triggerMobile && <Dialog.Trigger asChild>{triggerMobile}</Dialog.Trigger>}
            {triggerDesktop && <Dialog.Trigger asChild>{ triggerDesktop }</Dialog.Trigger>}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content px={{ base: 4, md: 6}} pt={{ base: 4, md: 6}}>
                        <Dialog.Body p={{ base: 1, md: 5 }}>
                            <VStack gap={{base:6, md: 16}}>
                                <FieldRow label="日付" isRequired={true} errorText={errors.date} >
                                    <Input ref={inputRef} value={date} w={{base: "170px", md: "280px"}}  type="date" onChange={(e)=> {setDate(e.target.value); }} fontSize={{base: "sm" , md: "xl"}} onClick={showPicker} cursor="pointer"/>
                                </FieldRow>
                                <FieldRow label="食事の時間帯" isRequired={true} errorText={ errors.mealTime }>
                                    <SelectField />
                                    {selectedMealTime === "other" && (
                                        <Input w={{ base: "120px", md: "200px" }} fontSize={{ base: "sm", md: "lg" }} placeholder="詳細" value={ mealTimeNote ?? ""} onChange = {(e) => setMealTimeNote?.(e.target.value)} />
                                    )}
                                </FieldRow>
                                <FieldGroup  error={errors.menus} />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer p={0}>
                            <Flex align="center" justify="left" w="100%">
                                <Image src="http://localhost/images/koharudiary.png" boxSize={{ base: 100, md: 150 }} mr={{ base: 4, md: 20 }} />
                                <Flex align="center" gap={{base: 4, md: 20}}>
                                    <Dialog.ActionTrigger asChild>
                                        <NavButton px={{base:4, md: 10}} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}} onClick={resetForm} bg="gray.400">キャンセル</NavButton>
                                    </Dialog.ActionTrigger>
                                    <NavButton bg="pink.500" px={{ base: 4, md: 10 }} py={{ base: 4, md: 5 }} fontSize={{ base: "sm", md: "xl" }} onClick={handleSubmit}>記録する</NavButton>
                                </Flex>
                            </Flex>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})