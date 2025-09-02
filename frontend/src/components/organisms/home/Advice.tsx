import { Box, CloseButton, Dialog, Flex, Image, Portal, Text } from "@chakra-ui/react";
import { FC, memo,useState } from "react";
import { useAdvice } from "../../../hooks/useAdvice";
import { NavButton } from "../../atoms/button/NavButton";
import { PawLoading } from "../../atoms/PawLoading";

export const Advice: FC = memo(() => {
    const { advice, loading, generateAdvice } = useAdvice();
    const [open, setOpen] = useState(false);
    const disabledShow = !advice || !advice.content;
    return (
        <Flex my={{ base: 10, md: 55, lg: 0 }} justify="space-around" align="flex-end">
            <Image src="http://localhost/images/koharuline.png" boxSize={{ base: 150, md: 230 }} alignSelf={{base: "auto", lg: "flex-end"}}/>
            <Box w="65%" bg="white"  p={{base: 3, md: 10}} borderRadius="lg" border="1px solid #aaa" boxShadow="md" wordBreak="break-word">
                <Text fontSize={{ base: "sm", md: "lg", lg: "2xl" }} fontWeight="bold" borderBottom="2px solid #aaa">こはる先生のアドバイス</Text>
                <Box display="grid" gap={6} pt={6}>
                    <NavButton bg="teal.400" onClick={async() => {
                        const res = await
                        generateAdvice({ profileId: 1 });
                        if (res.ok) setOpen(true);
                    }} >
                        {loading ? <PawLoading /> : "アドバイスを生成"}
                    </NavButton>
                    {!disabledShow && (
                        <NavButton bg="gray.200" color="gray.600" onClick={() => setOpen(true)}>アドバイスを表示</NavButton>
                    )}
                    <Flex flexDir="column">
                        <Text fontWeight="bold">最終更新</Text>
                        <Text>{advice?.created_at}</Text>
                    </Flex>
                </Box>
            </Box>

            <Dialog.Root open={open} onOpenChange={(e)=>setOpen(e.open)} placement="center" size="lg">
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size={{base: "md", md: "lg"}} borderRadius="full" />
                            </Dialog.CloseTrigger>
                            <Dialog.Header justifyContent="center" bg="pink.100" p={1}>
                                <Flex align="center" gap={2} >
                                    <Text as="h1"  fontWeight="bold" fontSize={24}>こはる先生のアドバイス</Text>
                                    <Image src="http://localhost/images/koharuface.png" objectFit="contain" boxSize={14}/>
                                </Flex>
                            </Dialog.Header>
                            <Dialog.Body pb={6}>
                                <Text lineHeight={1.5} whiteSpace="pre-wrap" fontSize={{base: "md", md: "lg"}}>
                                    {advice?.content}
                                </Text>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Flex>
    )
})