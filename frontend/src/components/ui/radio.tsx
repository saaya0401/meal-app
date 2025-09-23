import { RadioGroup as ChakraRadioGroup, HStack } from "@chakra-ui/react"
import * as React from "react"

export interface RadioProps extends ChakraRadioGroup.ItemProps {
  rootRef?: React.RefObject<HTMLDivElement | null>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
        <ChakraRadioGroup.Item ref={rootRef} {...rest} colorPalette="cyan">
          <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
          <ChakraRadioGroup.ItemIndicator />
          {children && (
            <ChakraRadioGroup.ItemText fontSize="md">{children}</ChakraRadioGroup.ItemText>
          )}
      </ChakraRadioGroup.Item>
    )
  },
)

export const RadioGroup = ChakraRadioGroup.Root
