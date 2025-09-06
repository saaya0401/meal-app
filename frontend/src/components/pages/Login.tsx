import { Box, Button, Flex, Heading, Input, Link, Separator, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useCallback, useState } from "react";
import { NavButton } from "../atoms/button/NavButton";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PawLoading } from "../atoms/PawLoading";
import { PasswordInput } from "../ui/password-input";
import { LuPawPrint } from "react-icons/lu";

export const Login: FC = memo(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await login(email, password);
        if (res.ok) {
            navigate("/home");
        }
    };
    return (
        <Flex align="center" height="100vh" justify="center" >
            <Box bg="white" w="lg" p={6} borderRadius="md" shadow="md" >
                <Heading as="h1" size="2xl">
                    <Flex align="center" gap={2} justify="center">
                        <LuPawPrint />
                        ひよりのごはん日記
                        <LuPawPrint />
                    </Flex>
                </Heading>
                <Separator borderColor="gray.300" w="100%" my={5} />
                <VStack gap={8} py={5} px={10}>
                    <Input placeholder="メールアドレス" fontSize="lg" value={ email } onChange={(e)=>setEmail(e.target.value)} />
                    <PasswordInput placeholder="パスワード" fontSize="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <VStack gap={3} w="100%">
                        <NavButton w="100%" bg="teal.500" onClick={handleLogin}>{loading ? <PawLoading text="" /> : "ログイン"}</NavButton>
                        { error && <Text color="red">{error}</Text>}
                    </VStack>
                </VStack>
                <Flex justify="center" align="center">
                    <Text>初めての方は</Text>
                    <Link href="http://localhost/api/register" color="blue" borderBottom="1px solid blue" lineHeight="1.1">こちら</Link>
                </Flex>
            </Box>
        </Flex>
    )
});