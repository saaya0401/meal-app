import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { forwardRef, } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export const MenuIconButton =
    forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
        return (
            <IconButton ref={ref} {...props} aria-label="メニューボタン" color={"gray.600"} display={{ base: "flex", md: "none" }} variant="plain" size="xs" asChild>
                <AiOutlineMenu />
            </IconButton>
        )
    });