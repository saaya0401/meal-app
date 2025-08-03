import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../../atoms/button/NavButton";
import { GoPencil } from "react-icons/go";

export const Header: FC = memo(() => {
    const navigate = useNavigate();
    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const onClickAllLogs = useCallback(() => navigate("/home/all-logs"), [navigate]);

    return (
        <>
            <Flex as="nav" bg="pink.200" color="gray.600" align="center" justify="space-between" py={{ base: 3, md: 5 }} pr={{ base: 3, md: 10 }} pl={{ base: 6, md: 10 }}>
                <Flex display={{base: "flex", md: "none"}} align="center" justify="center"  _hover={{cursor: "pointer", opacity: 0.8}} bg="purple.400" color="white" borderRadius="full" padding={2}>
                    <GoPencil size={ 20 } />
                </Flex>
                <Flex as="a" _hover={{cursor: "pointer"}} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: 25, md: 35 }} fontFamily="'Mochiy Pop P One', 'sans-serif'" >
                        ひよりのごはん日記
                    </Heading>
                </Flex>
                <Flex align="center" display={{ base: "none", md: "flex" }} gap={5}>
                    <Box>
                        <NavButton onClick={onClickAllLogs} bg="purple.400">記録を追加</NavButton>
                    </Box>
                    <Box>
                        <NavButton onClick={onClickAllLogs} bg="orange.400">記録一覧</NavButton>
                    </Box>
                </Flex>
                <MenuDrawer onClickHome={onClickHome} onClickAllLogs={onClickAllLogs}/>
            </Flex>
        </>
    )
})