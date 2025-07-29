import { Box, Button, CloseButton, Drawer, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import { FC, memo } from "react";
import { HiMenu } from "react-icons/hi";

export const Header: FC = memo(() => {
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
                <Flex as="a" _hover={{cursor: "pointer"}}>
                    <Heading as="h1" fontSize={{ base: 25, md: 35 }} fontFamily="'Mochiy Pop P One', 'sans-serif'">
                        ひよりのごはん日記
                    </Heading>
                </Flex>
                <Flex align="center" display={{ base:"none", md:"flex"}} >
                    <Box>
                        <Link bg="orange.400" p={3} color="white" fontSize={18} fontWeight="bold" borderRadius={10}>記録一覧</Link>
                    </Box>
                </Flex>
                <Drawer.Root placement="start" size="xs">
                    <Drawer.Trigger asChild>
                        <IconButton aria-label="メニューボタン" variant="plain" boxSize={ 8 } justifyContent="right" size="2xl" color={"gray.600"} display={{base: "flex", md: "none"}} >
                            <HiMenu />
                        </IconButton>
                    </Drawer.Trigger>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Body p={0} bg="gray.100">
                                <Button w="100%" bg="inherit" color="gray.600" _hover={{bg: "gray.200"}} py={10} fontSize={20} fontWeight={"bold"}>ホーム</Button>
                                <Button w="100%" bg="inherit" color="gray.600" _hover={{bg: "gray.200"}} py={10} fontSize={20} fontWeight={"bold"}>記録一覧</Button>
                            </Drawer.Body>
                            <Drawer.Footer />
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </Flex>
        </>
    )
})