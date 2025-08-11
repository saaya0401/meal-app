import { CloseButton, Dialog, Portal, Span,  } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";
import { DailyMealCard } from "../mealLog/DailyMealCard";


type Props = {
    trigger: ReactNode;
    date: string;
    title: string;
    body: ReactNode;
    footer?: ReactNode;
}

export const MealLogDialog: FC<Props> = memo((props) => {
    const { trigger, date, title, body, footer } = props;
    return (
        <Dialog.Root placement="center" size={{base:"sm" , md: "xl"}} scrollBehavior="inside">
            <Dialog.Trigger>{trigger}</Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size={{base:"md", md: "2xl"}}  borderRadius="full" />
                        </Dialog.CloseTrigger>
                        <Dialog.Header>
                            <Dialog.Title mt="20px" as="h1" fontWeight="bold" fontSize="2xl">
                                {date}
                                <Span ml={6}>{ title }</Span>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            { body }
                        </Dialog.Body>
                        <Dialog.Footer p={0} justifyContent="center">
                            {footer}
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})