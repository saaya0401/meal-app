import { useState } from "react";
import { Gender } from "../types/homeData";
import axios from "axios";

export const usePetProfileForm = () => {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [cropOpen, setCropOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
    const [gender, setGender] = useState<Gender>("male");
    const [weightKg, setWeightKg] = useState("");
    const [breed, setBreed] = useState("");
    const [personality, setPersonality] = useState("");
    const [isMultipleDogs, setIsMultipleDogs] = useState<boolean>(false);
    const [birthYear, setBirthYear] = useState<string | "">("");
    const [birthMonth, setBirthMonth] = useState<string | "">("");
    const [birthDay, setBirthDay] = useState<string | "">("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) {
            newErrors.name = "名前を入力してください";
        }
        if (!weightKg.trim()) {
            newErrors.weightKg = "体重を入力してください";
        } else if (!/^\d+(\.\d)?$/.test(weightKg)) {
            newErrors.weightKg = "半角数字で小数点第一位までで入力してください";
        }
        if (!birthYear || !birthMonth || !birthDay) {
            newErrors.birthdate = "誕生日をすべて選択してください";
        }
        if (!breed.trim()) {
            newErrors.breed = "犬種を入力してください";
        }
        if (personality.length > 100) {
            newErrors.personality = "性格は100文字以内で入力してください";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setTempImageSrc(url);
        setCropOpen(true);
    }

    const handleCropped = (blob: Blob, previewUrl: string) => {
        const file = new File([blob], "pet.jpg", { type: "image/png" });
        setImageFile(file);
        setImagePreview(previewUrl);
    }

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("weight_kg", weightKg);
        formData.append("breed", breed);
        formData.append("personality", personality);
        formData.append("birth_year", birthYear.toString());
        formData.append("birth_month", birthMonth.toString());
        formData.append("birth_day", birthDay.toString());
        formData.append("is_multiple_dogs", isMultipleDogs.toString());
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const token = localStorage.getItem("auth_token");
            const res = await axios.post("http://localhost/api/profiles", formData, {
                headers: {
                    Authorization: `Bearer ${token ?? ""}`,
                }
            });
            return { ok: true as const };
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.data?.errors) {
                console.log("バリデーションエラー:", e.response.data.errors);
            }
            return { ok: false as const, error: e };
        } finally {
            setLoading(false);
        }
    }

    return {
        name, setName,
        imageFile, setImageFile,
        imagePreview, setImagePreview,
        cropOpen, setCropOpen,
        tempImageSrc, setTempImageSrc,
        gender, setGender,
        weightKg, setWeightKg,
        breed, setBreed,
        personality, setPersonality,
        isMultipleDogs, setIsMultipleDogs,
        birthYear, setBirthYear,
        birthMonth, setBirthMonth,
        birthDay, setBirthDay,
        errors, setErrors,
        loading, setLoading,
        validate, onPickImage, handleCropped, handleSubmit
    };
}