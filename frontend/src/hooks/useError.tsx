import { useState } from "react";
import { MenuItem } from "../types/form";

type Errors = {
    date?: string;
    mealTime?: string;
    menus?: string;
}

export const useError = () => {
    const [errors, setErrors] = useState<Errors>({});

    const validateLogInput = (
        date: string | undefined,
        selectedMealTime: string | null,
        menus: MenuItem[]
    ): boolean => {
        const newErrors: Errors = {};
        if (!date || date.trim() === "") {
            newErrors.date = "日付を選択してください";
        }
        if (!selectedMealTime) {
            newErrors.mealTime = "時間帯を選択してください";
        }
        if (menus. length === 0 || menus.some((m) => !m.name.trim() || !m.amount.trim())) {
            newErrors.menus = "メニューと量を入力してください";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return { errors, validateLogInput, setErrors}
}