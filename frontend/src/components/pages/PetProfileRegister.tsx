import { Box, Button, FileUpload, Flex, Heading, HStack, Image, Input, Separator, Text, Textarea, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { PiPawPrintFill } from "react-icons/pi";
import { NavButton } from "../atoms/button/NavButton";
import { PawLoading } from "../atoms/PawLoading";
import { FieldRow } from "../molecules/InputFields/FieldRow";
import { Radio, RadioGroup } from "../ui/radio";
import { Gender } from "../../types/homeData";
import { ImageCropper } from "../molecules/ImageCropper";
import { LuFileImage, LuX } from "react-icons/lu";
import { BirthdateSelect } from "../molecules/InputFields/BirthdateSelect";
import { usePetProfileForm } from "../../hooks/usePetProfileForm";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";

export const PetProfileRegister: FC = memo(() => {
    const {name, setName, setImageFile,imagePreview, setImagePreview,cropOpen, setCropOpen,tempImageSrc,gender, setGender,weightKg, setWeightKg,breed, setBreed,personality, setPersonality,isMultipleDogs, setIsMultipleDogs,birthYear, setBirthYear,birthMonth, setBirthMonth,birthDay, setBirthDay,errors, onPickImage, handleCropped, handleSubmit, loading
    } = usePetProfileForm();
    const { showMessage } = useMessage();
    const navigate = useNavigate();
    const onSubmit = async () => {
        const result = await handleSubmit();
        if (result?.ok) {
            showMessage({ title: "プロフィールを登録しました", type: "success" });
            navigate("/home")
        } else {
            showMessage({ title: "登録できませんでした", type: "error" });
            console.error(result?.error);
        }
    }

    return (
        <Flex align="center" minHeight="100vh" justify="center" >
            <Box bg="white" w="2xl" p={6} borderRadius="md" shadow="md" >
                <Heading as="h1" size="2xl">
                    <Flex align="center" gap={2} justify="center">
                        <PiPawPrintFill color="#fa6fe7"/>
                            ペット情報登録
                        <PiPawPrintFill color="#fa6fe7"/>
                    </Flex>
                </Heading>
                <Separator borderColor="gray.300" w="100%" my={5} />
                <VStack gap={6} py={5} px={10} alignItems="left">
                    <FieldRow label="ペットのお名前" errorText={errors.name}>
                        <Input fontSize="lg" value={name} onChange={(e) => setName(e.target.value)} />
                    </FieldRow>
                    <FieldRow label="ペットの画像" isRequired={false}>
                        <Flex gap={3} align="center" flexDir="column">
                            <FileUpload.Root accept="image/*" onChange={onPickImage}>
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <LuFileImage />画像をアップロード
                                    </Button>
                                </FileUpload.Trigger>
                            </FileUpload.Root>
                            {imagePreview && (
                                <Box position="relative" boxSize={20}>
                                    <Image src={imagePreview} alt="preview" boxSize="100%" objectFit="cover" borderRadius="full" />
                                    <Button aria-label="画像削除" w={1} size="2xs" position="absolute" top={0} right={-2} borderRadius="full" onClick={() => {
                                        setImageFile(null);
                                        setImagePreview(null);
                                    }}>
                                        <LuX />
                                    </Button>
                                </Box>
                            )}
                        </Flex>
                    </FieldRow>
                    {tempImageSrc && (
                        <ImageCropper open={cropOpen} onOpenChange={setCropOpen} src={tempImageSrc} onCropped={handleCropped}/>
                    )}
                    <FieldRow label="性別">
                        <RadioGroup value={gender} onValueChange={(e)=>setGender(e.value as Gender)}>
                            <HStack gap={6}>
                                <Radio value="male">オス</Radio>
                                <Radio value="female">メス</Radio>
                            </HStack>
                        </RadioGroup>
                    </FieldRow>
                    <FieldRow label="誕生日" errorText={errors.birthdate}>
                        <BirthdateSelect birthDay={birthDay} birthMonth={birthMonth} birthYear={birthYear} setBirthDay={setBirthDay} setBirthMonth={setBirthMonth} setBirthYear={setBirthYear} />
                    </FieldRow>
                    <FieldRow label="体重" errorText={errors.weightKg}>
                        <Flex w="40%" gap={2} align="baseline" justify="left">
                            <Input fontSize="lg" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
                            <Text fontSize="lg">kg</Text>
                        </Flex>
                    </FieldRow>
                    <FieldRow label="犬種" errorText={errors.breed}>
                        <Input fontSize="lg" value={breed} onChange={(e) => setBreed(e.target.value)} />
                    </FieldRow>
                    <FieldRow label="性格" isRequired={false} errorText={errors.personality}>
                        <Textarea fontSize="md" placeholder="例：寂しがり、気が強い、甘えん坊など" lineHeight={1.5} value={personality} onChange={(e)=> {setPersonality(e.target.value)}} />
                    </FieldRow>
                    <FieldRow label="多頭飼い">
                        <RadioGroup value={isMultipleDogs ? "1" : "0"} onValueChange={(e)=>setIsMultipleDogs(e.value === "1")}>
                            <HStack gap={6}>
                                <Radio value="1">有り</Radio>
                                <Radio value="0">無し</Radio>
                            </HStack>
                        </RadioGroup>
                    </FieldRow>
                    <VStack gap={3} w="100%">
                        <NavButton w="160px" bg="teal.500" onClick={onSubmit} isDisabled={loading}>{loading ? <PawLoading text="" /> : "登録"}</NavButton>
                    </VStack>
                </VStack>
            </Box>
        </Flex>
    )
});