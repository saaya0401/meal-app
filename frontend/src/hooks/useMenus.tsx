import { useCallback, useState } from "react";

export const useMenus = (initial = [{name: "", amount: ""}]) => {
    const [menus, setMenus] = useState(initial);

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

    return {menus, setMenus,  menuAdd, menuChange }
}