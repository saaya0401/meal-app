import { Field, Flex, Input } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    isRequired?: boolean;
    label: string;
    children: ReactNode;
    errorText?: string;
    htmlFor?: string;
}

export const FieldRow: FC<Props> = memo((props) => {
    const { isRequired, htmlFor, label, children, errorText} = props;
    return (
        <Field.Root required={isRequired} invalid={!!errorText}>
            <Flex align="center" gap={{base:4 , md: 10}}>
                <Field.Label htmlFor={htmlFor} fontWeight="bold" minW={{base: "90px" , md: "150px"}} fontSize={{base: "sm" , md: "xl"}}>{ label }</Field.Label>
                {children}
            </Flex>
            <Field.ErrorText color="red.600" fontSize={{base: "md", md: "xl"}} pt={3}>{ errorText }</Field.ErrorText>
        </Field.Root>
    )
})