
import { FC, memo, ReactNode } from "react";
import { Button } from "../../ui/Button";


type Props = {
    onClick: () => void;
    children: ReactNode;
    bg: string;
    w?: string | null;
}

export const NavButton: FC<Props> = memo((props) => {
    const {onClick, children, bg, w} = props;
    return (
        <Button visual="navButton" onClick={onClick} bg={bg} {...(w ? { w } : {})} >{children}</Button>
        )
});