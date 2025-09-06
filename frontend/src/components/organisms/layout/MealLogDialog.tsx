import { Box, CloseButton, Dialog, Flex, IconButton, Image, Portal, Span, VStack } from "@chakra-ui/react";
import { FC, memo, ReactNode, useCallback, useEffect, useState } from "react";
import { MealLogCard } from "../mealLog/MealLogCard";
import { FieldGroup } from "../mealLog/FieldGroup";
import { NavButton } from "../../atoms/button/NavButton";
import { HydratePayload } from "../../../hooks/useLogs";
import { useError } from "../../../hooks/useError";
import { useDailyLogs } from "../../../hooks/useDailyLogs";
import { Loading } from "../../molecules/Loading";
import { useLogsContext } from "../../../providers/LogsContext";
import { useUpdateMealLog } from "../../../hooks/useUpdateMealLog";
import { MealTime } from "../../../types/homeData";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteMealLog } from "../../../hooks/useDeleteMealLog";


type Props = {
    date: string | null | undefined;
    formattedDate: string | undefined;
    dailyLogTrigger?: ReactNode;
    onUpdated?: () => void;
}

export const MealLogDialog: FC<Props> = memo((props) => {
    const { date, dailyLogTrigger, formattedDate, onUpdated } = props;
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [mealTime, setMealTime] = useState<MealTime | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { resetForm, hydrateFromLog, menus, selectedMealTime, mealTimeNote, rate, memoText } = useLogsContext();
    const { errors, validateLogInput } = useError();
    const { getDailyLogs, loading, logs, error } = useDailyLogs();
    const { updateMealLog } = useUpdateMealLog();
    const { deleteMealLog } = useDeleteMealLog();

    useEffect(() => {
        if (viewOpen) {
            getDailyLogs(date);
        }
    }, [viewOpen, date, getDailyLogs]);

    const handleEditFromView = useCallback((log: HydratePayload & { id: number }) => {
        setViewOpen(false);
        setMealTime(log.meal_time ?? null);
        setEditingId(log.id);
        hydrateFromLog(log);
        setTimeout(() => setEditOpen(true), 0);
    }, [hydrateFromLog]);

    const backButton = useCallback(() => {
        resetForm();
        setEditOpen(false);
        setTimeout(() => setViewOpen(true), 0);
    }, []);

    const handleUpdate = useCallback(async () => {
        if (!editingId) return;
        if (!validateLogInput(undefined, selectedMealTime, menus, { requireDate: false })) {
            return;
        }
        const payload = {
            date,
            meal_time: selectedMealTime,
            meal_time_note: selectedMealTime === "other" ? mealTimeNote : null,
            menu: menus.map((m) => ({
                ...m,
                amount: `${m.amount}g`
            })),
            amount_percent: `${rate}割`,
            memo: memoText
        }
        const res = await updateMealLog(editingId, payload);
        if (res.ok) {
            resetForm();
            setEditOpen(false);
            setViewOpen(false);
            onUpdated?.();
        }
    }, [editingId, date, selectedMealTime, mealTimeNote, menus, rate, memoText, updateMealLog, validateLogInput, getDailyLogs, onUpdated]);

    const handleDelete = useCallback(async () => {
        if (!editingId) return;
        const res = await deleteMealLog(editingId);
        if (res.ok) {
            setEditOpen(false);
            setViewOpen(false);
            onUpdated?.();
        }
    }, [editingId, deleteMealLog, onUpdated]);

    return (
        <>
            <Dialog.Root placement="center" size={{base:"sm" , md: "xl"}} scrollBehavior="inside" open={viewOpen} onOpenChange={(e) => setViewOpen(e.open) } lazyMount >
                <Dialog.Trigger>
                    { dailyLogTrigger }
                </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size={{base:"md", md: "2xl"}}  borderRadius="full" />
                        </Dialog.CloseTrigger>
                        <Dialog.Header py={3}>
                            <Dialog.Title mt={{base: "0", md: "20px"}} as="h1" fontWeight="bold" fontSize={{ base: "lg", md: "2xl"}}>
                                {formattedDate}
                                    <Span ml={6}>食事履歴</Span>
                            </Dialog.Title>
                        </Dialog.Header>
                            <Dialog.Body pb={{ base: 3, md: 10 }}>
                                {loading && <Loading loadingWord="読み込み中" />}
                                {error && <Box color="red">{error}</Box>}
                                <VStack gap={{ base: 6, md: 6 }}>
                                    {logs.map((log) => (
                                        <MealLogCard key={log.id} onClick={() => handleEditFromView(log)} mealTime={log.meal_time} mealTimeNote={log.meal_time_note} menu={ log.menu} amountPercent={log.amount_percent} memo={log.memo} />
                                    ))}
                                </VStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>

            <Dialog.Root placement="center" size={{ base: "sm", md: "xl" }} scrollBehavior="inside" open={editOpen} onOpenChange={(e) => setEditOpen(e.open)} lazyMount >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header py={3}>
                            <Dialog.Title mt={{ base: "0", md: "20px" }} as="h1" fontWeight="bold" fontSize={{ base: "md", md: "2xl" }} w="100%">
                                <Flex justify="space-between" align="center" >
                                    <Box>
                                        {formattedDate}
                                        <Span ml={6}>{mealTime}</Span>
                                    </Box>
                                    <IconButton onClick={handleDelete} aria-label="削除" size={{base: "xs", md: "sm"}} variant="plain" asChild>
                                        <RiDeleteBin6Line color="red" />
                                    </IconButton>
                                </Flex>
                            </Dialog.Title>
                        </Dialog.Header>
                            <Dialog.Body p={{base: 0, md: 6}}>
                                <VStack bg="yellow.50" gap={{ base: 6, md: 16 }} p={{base: 2, md:6}}>
                                    <FieldGroup error={errors.menus} />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer p={0} justifyContent="center">
                            <Flex align="center" justify="left" w="100%" mt={1} >
                                <Image src="http://localhost/images/koharudiary.png" boxSize={{ base: 100, md: 150 }} mr={{ base: 5, md: 20}} />
                                <Flex align="center" gap={{base: 5, md: 20}}>
                                    <NavButton px={{base:6, md: 10}} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}} onClick={backButton} bg="gray.400">キャンセル</NavButton>
                                    <NavButton bg="pink.500" px={{ base: 6, md: 10 }} py={{ base: 4, md: 5 }} fontSize={{ base: "sm", md: "xl" }} onClick={handleUpdate}>更新する</NavButton>
                                </Flex>
                            </Flex>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
        </>
    )
})