import { theme } from "../..//theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function Provider({ children }: Props) {
    return <ChakraProvider value={theme}>{children}</ChakraProvider>;
}
