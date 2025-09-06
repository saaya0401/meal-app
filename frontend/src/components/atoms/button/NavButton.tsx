
import { ComponentProps, FC, memo, ReactNode } from "react";
import { Button } from "../../ui/Button";


type Props = {
    onClick?: (() => void) | null;
    children: ReactNode;
    bg: string;
    w?: ComponentProps<typeof Button>["w"];
    px?: ComponentProps<typeof Button>["px"];
    py?: ComponentProps<typeof Button>["py"];
    fontSize?: ComponentProps<typeof Button>["fontSize"];
    color?: string;
    display?: string;
    isLoading?: boolean;
}

export const NavButton: FC<Props> = memo((props) => {
    const {onClick, display, children, fontSize, bg, w, px, py, color, isLoading} = props;
    return (
        <Button color={color} visual="navButton" {...(onClick ? { onClick } : {})} {...(isLoading ? { isLoading } : {})}  bg={bg} {...(w ? { w } : {})} {...(px ? { px } : {})}  {...(py ? { py } : {})} {...(fontSize ? { fontSize } : {})}>{children}</Button>
        )
});