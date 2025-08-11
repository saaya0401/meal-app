import { Flex, Spinner, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    loadingWord: string;
}

export const Loading: FC<Props> = memo((props) => {
    const { loadingWord } = props;
    return (
        <Flex align="center" justify="center" h="50vh" flexDirection="column" gap={4}>
            <Spinner size="lg" color="pink.600" css={{ "--spinner-track-color": "colors.gray.200" }} borderWidth="5px" />
            <Text color="pink.600" fontWeight="bold">{ loadingWord }</Text>
        </Flex>
    )
})