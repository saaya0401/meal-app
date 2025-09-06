import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../../atoms/button/NavButton";
import { GoPencil } from "react-icons/go";
import { AddLogDialog } from "./AddLogDialog";
import { useAllLogsContext } from "../../../providers/AllLogsContext";
import { useAuth } from "../../../hooks/useAuth";
import { LuPawPrint } from "react-icons/lu";

export const Header: FC = memo(() => {
    const navigate = useNavigate();
    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const onClickAllLogs = useCallback(() => navigate("/home/all-logs"), [navigate]);
    const { getAllLogs } = useAllLogsContext();

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <>
            <Flex as="nav" bg="pink.200" color="gray.600" align="center" justify="space-between" py={{ base: 3, md: 5 }} pr={{ base: 3, md: 10 }} pl={{ base: 6, md: 10 }}>
                <AddLogDialog triggerMobile={
                        <IconButton display={{ base: "flex", md: "none" }} _hover={{ opacity: 0.8 }} bg="purple.400" color="white" borderRadius="full" padding={2} size="md" asChild>
                            <GoPencil  />
                        </IconButton>}
                        triggerDesktop={null}
                        onSuccess={getAllLogs}
                    />
                <Flex as="a" _hover={{cursor: "pointer"}} onClick={onClickHome}>
                    <Flex align="center" gap={4} fontSize={{ base: 25, md: 35 }} fontFamily="'Mochiy Pop P One', 'sans-serif'" >
                        <LuPawPrint />
                        ひよりのごはん日記
                        <LuPawPrint />
                    </Flex>
                </Flex>
                <Flex align="center" display={{ base: "none", md: "flex" }} gap={5}>
                    <AddLogDialog triggerMobile={null}
                        triggerDesktop={
                            <NavButton bg="purple.400">記録を追加</NavButton>
                        }
                        onSuccess={getAllLogs}
                    />
                    <NavButton onClick={onClickAllLogs} bg="orange.400">記録一覧</NavButton>
                    <NavButton onClick={handleLogout} bg="gray.400">ログアウト</NavButton>
                </Flex>
                <MenuDrawer onClickHome={onClickHome} onClickAllLogs={onClickAllLogs} onClickLogout={ handleLogout } />
            </Flex>
        </>
    )
})