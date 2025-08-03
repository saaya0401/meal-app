import { Drawer, Flex } from "@chakra-ui/react";
import { FC, memo } from "react";
import { MenuIconButton } from "../atoms/button/MenuIconButton";
import { GoHome, GoNote, GoPencil } from "react-icons/go";
import { Button } from "../ui/Button";

type Props = {
    onClickHome: () => void;
    onClickAllLogs: () => void;
}

export const MenuDrawer: FC<Props> = memo((props) => {
    const { onClickHome, onClickAllLogs } = props;
    return (
        <Drawer.Root placement="start" size="xs">
            <Drawer.Trigger asChild>
                <MenuIconButton />
            </Drawer.Trigger>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body p={0} bg="gray.100">
                        <Drawer.CloseTrigger asChild >
                            <Button visual="menuItem" onClick={onClickHome} position="static">
                                <Flex align="center" justify="center" gap={2}>
                                    <GoHome />
                                    ホーム
                                </Flex>
                            </Button>
                        </Drawer.CloseTrigger>
                        <Drawer.CloseTrigger asChild>
                            <Button visual="menuItem" onClick={onClickAllLogs} position="static">
                                <Flex align="center" justify="center" gap={2}>
                                    <GoNote />
                                    記録一覧
                                </Flex>
                            </Button>
                        </Drawer.CloseTrigger>
                    </Drawer.Body>
                    <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
})