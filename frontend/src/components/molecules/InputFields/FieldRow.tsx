import { Field, Flex, Text } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    isRequired?: boolean;
    label: string;
    children: ReactNode;
    errorText?: string;
    htmlFor?: string;
}

export const FieldRow: FC<Props> = memo((props) => {
    const { isRequired = true, htmlFor, label, children, errorText} = props;
    return (
        <Field.Root required={isRequired} invalid={!!errorText}>
            <Flex align="center" gap={{ base: 4, md: 10 }} w="100%">
                <Flex align="baseline" justify="left" minW={{ base: "90px", md: "160px" }} gap={2} whiteSpace="nowrap">
                    <Field.Label htmlFor={htmlFor} fontWeight="bold" fontSize={{ base: "sm", md: "xl" }}>{label}</Field.Label>
                    {isRequired || (<Text fontSize="sm" color="gray">( 任意 )</Text>)}
                </Flex>
                {children}
            </Flex>
            <Field.ErrorText color="red.600" fontSize={{base: "md", md: "lg"}} pt={3}>{ errorText }</Field.ErrorText>
        </Field.Root>
    )
})