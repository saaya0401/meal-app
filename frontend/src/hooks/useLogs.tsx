import { useCallback, useState } from "react";

export const useLogs = (initial = [{name: "", amount: ""}]) => {
    const [menus, setMenus] = useState(initial);
    const [selectedMealTime, setSelectedMealTime] = useState<string | null>(null);
    const [rate, setRate] = useState(5);

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
        setSelectedMealTime(null);
        setMenus([{ name: "", amount: "" }]);
        setRate(5);
    }, [setSelectedMealTime, setMenus]);
    return {menus, setMenus,  menuAdd, menuChange, selectedMealTime, setSelectedMealTime, rate, setRate, resetForm }
}