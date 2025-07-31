import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";

export const Header: FC = memo(() => {
    const navigate = useNavigate();
    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const onClickAllLogs = useCallback(() => navigate("/home/all-logs"), [navigate]);

    return (
        <>
            <Flex
            as="nav"
            bg="pink.200"
            color="gray.600"
            align="center"
            justify="space-between"
            py={{ base: 3, md: 3 }}
            px={{ base: 6, md: 6}}
        >
                <Flex as="a" _hover={{cursor: "pointer"}} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: 25, md: 35 }} fontFamily="'Mochiy Pop P One', 'sans-serif'">
                        ひよりのごはん日記
                    </Heading>
                </Flex>
                <Flex align="center" display={{ base:"none", md:"flex"}} >
                    <Box>
                        <Link onClick={onClickAllLogs} bg="orange.400" p={3} color="white" fontSize={18} fontWeight="bold" borderRadius={10}>記録一覧</Link>
                    </Box>
                </Flex>
                <MenuDrawer onClickHome={onClickHome} onClickAllLogs={onClickAllLogs}/>
            </Flex>
        </>
    )
})