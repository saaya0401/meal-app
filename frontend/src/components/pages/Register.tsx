import { Box, Flex, Heading, Input, Link, Separator, Text, VStack } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { NavButton } from "../atoms/button/NavButton";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PawLoading } from "../atoms/PawLoading";
import { PasswordInput } from "../ui/password-input";
import { PiPawPrintFill } from "react-icons/pi";
import { useRegisterForm } from "../../hooks/useRegisterForm";

export const Register: FC = memo(() => {
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();
    const { validateForm, name, email, password, passwordConfirm, setEmail, setName, setPassword, setPasswordConfirm, setFieldErrors, fieldErrors } = useRegisterForm();
    const handleRegister = useCallback(async () => {
        if (!validateForm()) return;
        const res = await register(name.trim(), email.trim(), password);
        if (res.ok) {
            navigate("/petProfile/register");
        } else {
            setFieldErrors((prev) => ({ ...prev, general: error ?? "登録に失敗しました" }));
        }
    }, [name, email, password, navigate, register, validateForm, setFieldErrors, error]);
    return (
        <Flex align="center" height="100vh" justify="center" >
            <Box bg="white" w="lg" p={6} borderRadius="md" shadow="md" >
                <Heading as="h1" size="2xl">
                    <Flex align="center" gap={2} justify="center">
                        <PiPawPrintFill color="#fa6fe7"/>
                        新規会員登録
                        <PiPawPrintFill color="#fa6fe7"/>
                    </Flex>
                </Heading>
                <Separator borderColor="gray.300" w="100%" my={5} />
                <VStack gap={6} py={5} px={10}>
                    <Box w="100%">
                        <Input placeholder="ユーザー名" fontSize="lg" value={name} onChange={(e) => setName(e.target.value)} />
                        {fieldErrors.name && <Text mt={1} color="red">{fieldErrors.name}</Text>}
                    </Box>
                    <Box w="100%">
                        <Input placeholder="メールアドレス" fontSize="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {fieldErrors.email && <Text mt={1} color="red">{fieldErrors.email}</Text>}
                    </Box>
                    <Box w="100%">
                        <PasswordInput placeholder="パスワード" fontSize="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {fieldErrors.password && <Text mt={1} color="red">{fieldErrors.password}</Text>}
                    </Box>
                    <Box w="100%">
                        <PasswordInput placeholder="確認用パスワード" fontSize="lg" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        {fieldErrors.passwordConfirm && <Text mt={1} color="red">{fieldErrors.passwordConfirm}</Text>}
                    </Box>
                    <VStack gap={3} w="100%">
                        <NavButton w="100%" bg="teal.500" onClick={handleRegister} isDisabled={loading}>{loading ? <PawLoading text="" /> : "登録"}</NavButton>
                        { error && <Text color="red">{error}</Text>}
                    </VStack>
                </VStack>
                <Flex justify="center" align="center">
                    <Text>ログインは</Text>
                    <Link href="/login" color="blue" borderBottom="1px solid blue" lineHeight="1.1">こちら</Link>
                </Flex>
            </Box>
        </Flex>
    )
});