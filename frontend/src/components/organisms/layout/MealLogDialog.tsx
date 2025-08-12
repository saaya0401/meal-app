import { CloseButton, Dialog, Flex, Image, Portal, Span, VStack } from "@chakra-ui/react";
import { FC, memo, ReactNode, useCallback, useState } from "react";
import { DailyMealCard } from "../mealLog/DailyMealCard";
import { MealLogCard } from "../mealLog/MealLogCard";
import { FieldGroup } from "../mealLog/FieldGroup";
import { NavButton } from "../../atoms/button/NavButton";
import { useLogs } from "../../../hooks/useLogs";


type Props = {
    date: string;
    editTrigger?: ReactNode;
    dailyLogTrigger?: ReactNode;
}

export const MealLogDialog: FC<Props> = memo((props) => {
    const { date, editTrigger, dailyLogTrigger } = props;
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [mealTime, setMealTime] = useState<string | null>(null);

    const handleEditFromView = useCallback((mealTime: string) => {
        setViewOpen(false);
        setMealTime(mealTime);
        setTimeout(() => setEditOpen(true), 0);
    }, [])
    const { resetForm } = useLogs();
    const backButton = useCallback(() => {
        resetForm();
        setEditOpen(false);
        setTimeout(() => setViewOpen(true), 0);
    }, []);
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
                                {date}
                                <Span ml={6}>食事履歴</Span>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb={{base: 3, md: 10}}>
                            <VStack gap={{ base: 6, md: 6 }}>
                                <MealLogCard onClick={handleEditFromView} mealTime="朝ごはん" />
                                <MealLogCard mealTime="昼ごはん" onClick={handleEditFromView} />
                            </VStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>

            <Dialog.Root placement="center" size={{ base: "sm", md: "xl" }} scrollBehavior="inside" open={editOpen} onOpenChange={(e) => setEditOpen(e.open)} lazyMount >
                <Dialog.Trigger>
                    {editTrigger}
                </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header py={3}>
                                <Dialog.Title mt={{base: "0", md: "20px"}} as="h1" fontWeight="bold" fontSize={{ base: "md", md: "2xl"}} >
                                {date}
                                <Span ml={6}>{ mealTime }</Span>
                            </Dialog.Title>
                        </Dialog.Header>
                            <Dialog.Body p={{base: 0, md: 6}}>
                                <VStack bg="yellow.50" gap={{ base: 6, md: 16 }} p={{base: 2, md:6}}>
                                <FieldGroup />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer p={0} justifyContent="center">
                                <Flex align="center" justify="left" w="100%" mt={1} >
                                    <Image src="http://localhost/images/koharudiary.png" boxSize={{ base: 100, md: 150 }} mr={{ base: 5, md: 20}} />
                                    <Flex align="center" gap={{base: 5, md: 20}}>
                                        <NavButton px={{base:6, md: 10}} py={{ base: 4, md: 5}} fontSize={{base: "sm", md: "xl"}} onClick={backButton} bg="gray.400">キャンセル</NavButton>
                                <NavButton bg="pink.500" px={{ base: 6, md: 10 }} py={{ base: 4, md: 5 }} fontSize={{ base: "sm", md: "xl" }}>更新する</NavButton>
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