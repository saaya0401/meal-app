
import { FC, memo, ReactNode } from "react";
import { Button } from "../../ui/Button";


type Props = {
    onClick: () => void;
    children: ReactNode;
    bg: string;
}

export const NavButton: FC<Props> = memo((props) => {
    const {onClick, children, bg} = props;
    return (
        <Button visual="navButton" onClick={onClick} bg={ bg } >{children}</Button>
        )
});