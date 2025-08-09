
import { ComponentProps, FC, memo, ReactNode } from "react";
import { Button } from "../../ui/Button";


type Props = {
    onClick?: (() => void) | null;
    children: ReactNode;
    bg: string;
    w?: ComponentProps<typeof Button>["py"];
    px?: ComponentProps<typeof Button>["py"];
    py?: ComponentProps<typeof Button>["py"];
    fontSize?: ComponentProps<typeof Button>["py"];
}

export const NavButton: FC<Props> = memo((props) => {
    const {onClick, children, fontSize, bg, w, px, py} = props;
    return (
        <Button visual="navButton" {...(onClick ? { onClick } : {})}  bg={bg} {...(w ? { w } : {})} {...(px ? { px } : {})}  {...(py ? { py } : {})} {...(fontSize ? { fontSize } : {})}>{children}</Button>
        )
});