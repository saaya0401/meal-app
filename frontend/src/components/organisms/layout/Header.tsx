import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FC, memo, useCallback,  useState } from "react";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../../atoms/button/NavButton";
import { GoPencil } from "react-icons/go";
import { RecordDialog } from "./AddLogDialog";
import { useMenus } from "../../../hooks/useMenus";

export const Header: FC = memo(() => {
    const navigate = useNavigate();
    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const onClickAllLogs = useCallback(() => navigate("/home/all-logs"), [navigate]);

    const [selectedMealTime, setSelectedMealTime] = useState<string | null>(null);

    const { setMenus } = useMenus();
    const resetForm = useCallback(() => {
        setSelectedMealTime(null);
        setMenus([{ name: "", amount: "" }]);
    }, [setSelectedMealTime, setMenus]);
    return (
        <>
            <Flex as="nav" bg="pink.200" color="gray.600" align="center" justify="space-between" py={{ base: 3, md: 5 }} pr={{ base: 3, md: 10 }} pl={{ base: 6, md: 10 }}>
                <RecordDialog triggerMobile={
                        <IconButton display={{ base: "flex", md: "none" }} _hover={{ opacity: 0.8 }} bg="purple.400" color="white" borderRadius="full" padding={2} size="md" asChild>
                            <GoPencil  />
                        </IconButton>}
                        triggerDesktop={null}
                        selectedMealTime={selectedMealTime} setSelectedMealTime={setSelectedMealTime}
                        resetForm={resetForm}
                    />
                <Flex as="a" _hover={{cursor: "pointer"}} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: 25, md: 35 }} fontFamily="'Mochiy Pop P One', 'sans-serif'" >
                        ひよりのごはん日記
                    </Heading>
                </Flex>
                <Flex align="center" display={{ base: "none", md: "flex" }} gap={5}>
                    <RecordDialog triggerMobile={null}
                        triggerDesktop={
                            <NavButton bg="purple.400">記録を追加</NavButton>
                        }
                        selectedMealTime={selectedMealTime} setSelectedMealTime={setSelectedMealTime}
                        resetForm={resetForm}
                    />
                    <Box>
                        <NavButton onClick={onClickAllLogs} bg="orange.400">記録一覧</NavButton>
                    </Box>
                </Flex>
                <MenuDrawer onClickHome={onClickHome} onClickAllLogs={onClickAllLogs}/>
            </Flex>
        </>
    )
})