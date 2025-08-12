import { useCallback, useRef } from "react";

export const useDatePicker = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
        const showPicker = useCallback(() => {
            if (inputRef.current) {
                if ("showPicker" in inputRef.current) {
                    (inputRef.current as any).showPicker();
                }
            }
        }, []);
    return { inputRef, showPicker };
}