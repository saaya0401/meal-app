
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
}

export const NavButton: FC<Props> = memo((props) => {
    const {onClick, children, fontSize, bg, w, px, py} = props;
    return (
        <Button visual="navButton" {...(onClick ? { onClick } : {})}  bg={bg} {...(w ? { w } : {})} {...(px ? { px } : {})}  {...(py ? { py } : {})} {...(fontSize ? { fontSize } : {})}>{children}</Button>
        )
});