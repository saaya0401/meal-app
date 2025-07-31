import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FC, forwardRef, memo } from "react";
import { HiMenu } from "react-icons/hi";

export const MenuIconButton =
    forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
        return (
            <IconButton ref={ref} {...props} aria-label="メニューボタン" variant="plain" boxSize={8} justifyContent="right" size="2xl" color={"gray.600"} display={{ base: "flex", md: "none" }} >
                <HiMenu />
            </IconButton>
        )
    });