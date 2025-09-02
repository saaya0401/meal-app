import { useCallback, useState } from "react";
import { MealTime } from "../types/homeData";
import { MenuItem } from "../types/form";

export type HydratePayload = {
    date?: string;
    meal_time?: MealTime;
    meal_time_note?: string | null;
    menu?: MenuItem[];
    amount_percent?: string;
    memo?: string | null;
}

export const useLogs = (initial = [{ name: "", amount: "" }]) => {
    const [date, setDate] = useState(() => {
        const now = new Date();
        const tzOffsetMs = now.getTimezoneOffset() * 60 * 1000;
        const local = new Date(now.getTime() - tzOffsetMs);
        return local.toISOString().slice(0, 10);
    });
    const [menus, setMenus] = useState(initial);
    const [selectedMealTime, setSelectedMealTime] = useState<MealTime | null >(null);
    const [mealTimeNote, setMealTimeNote] = useState<string>("");
    const [rate, setRate] = useState(5);
    const [memoText, setMemoText] = useState("");

    const menuAdd = useCallback(() => {
            setMenus(prev => [...prev, { name: "", amount: "" }]);
    }, []);

    const menuRemove = useCallback((index: number) => {
        setMenus((prev) => prev.filter((_, i) => i !== index));
    }, [])
    const menuChange = useCallback((index: number, field: "name" | "amount", value: string) => {
        setMenus((prev) => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        })
    }, []);

    const resetForm = useCallback(() => {
        setDate("");
        setSelectedMealTime(null);
        setMealTimeNote("");
        setMenus([{ name: "", amount: "" }]);
        setRate(5);
        setMemoText("");
    }, []);

    const jpToCode: Record<string, 'morning' | 'noon' | 'evening' | 'other'> = {
        '朝ごはん': 'morning',
        '昼ごはん': 'noon',
        '夜ごはん': 'evening',
        'その他': 'other'
    } as const;

    const hydrateFromLog = useCallback((log: HydratePayload) => {
        if (log.date) setDate(log.date);
        if (log.meal_time) setSelectedMealTime(jpToCode[log.meal_time]);
        setMealTimeNote(log.meal_time_note ?? "");
        if (log.menu) {
            setMenus(
                log.menu.map(m => ({
                    name: m.name,
                    amount: String(m.amount).replace(/g$/i, ""),
                }))
            );
        }
        if (log.amount_percent) {
            const n = Number(String(log.amount_percent).replace("割", ""));
            if (!Number.isNaN(n)) setRate(n);
        }
        setMemoText(log.memo ?? "");
    }, [])
    return {menus, setMenus,  menuAdd, menuChange, selectedMealTime, setSelectedMealTime, mealTimeNote, setMealTimeNote, rate, setRate, resetForm, memoText, setMemoText, date, setDate, hydrateFromLog, menuRemove}
}