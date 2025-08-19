import { useCallback, useState } from "react";

export const useLogs = (initial = [{ name: "", amount: "" }]) => {
    const [date, setDate] = useState(() => {
        const now = new Date();
        const tzOffsetMs = now.getTimezoneOffset() * 60 * 1000;
        const local = new Date(now.getTime() - tzOffsetMs);
        return local.toISOString().slice(0, 10);
    });
    const [menus, setMenus] = useState(initial);
    const [selectedMealTime, setSelectedMealTime] = useState<string | null>(null);
    const [mealTimeNote, setMealTimeNote] = useState<string>("");
    const [rate, setRate] = useState(5);
    const [memoText, setMemoText] = useState("");

    const menuAdd = useCallback(() => {
            setMenus(prev => [...prev, { name: "", amount: "" }]);
    }, []);

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
    return {menus, setMenus,  menuAdd, menuChange, selectedMealTime, setSelectedMealTime, mealTimeNote, setMealTimeNote, rate, setRate, resetForm, memoText, setMemoText, date, setDate}
}