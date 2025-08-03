import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { forwardRef, } from "react";
import { HiMenu } from "react-icons/hi";

export const MenuIconButton =
    forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
        return (
            <IconButton ref={ref} {...props} aria-label="メニューボタン" color={"gray.600"} display={{ base: "flex", md: "none" }} size="xl" variant="plain" >
                <HiMenu />
            </IconButton>
        )
    });