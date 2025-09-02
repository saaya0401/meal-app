import { useCallback } from "react"
import { toaster } from "../components/ui/toaster"

type Props = {
    title: string;
    type: "success" | "error" | "warning" | "info";
}

export const useMessage = () => {
    const showMessage = useCallback((props: Props) => {
        const { title, type } = props;
        toaster.create({
            closable: true,
            duration: 3000,
            title,
            type,
        })
    }, [toaster])
    return {showMessage}
}