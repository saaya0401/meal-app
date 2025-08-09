import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { FC, memo } from "react";
import { SelectOption } from "../../../types/form";

type Props = {
    items: SelectOption[];
    value: string | null;
    onChange: (value: string | null) => void;
}

export const SelectField: FC<Props> = memo((props) => {
    const { items,value, onChange } = props;
    const collection = createListCollection({ items });

    return (
        <Select.Root gap={0} w={{base: "170px", md: "280px"}} collection={collection} value={value ? [value] : []} onValueChange={(details) => onChange(details.value[0] || null)} >
            <Select.HiddenSelect />
            <Select.Label />
            <Select.Control >
                <Select.Trigger cursor="pointer">
                    <Select.ValueText fontSize={{base: "sm" , md: "xl"}} placeholder="選択してください"/>
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal >
                <Select.Positioner >
                    <Select.Content zIndex={3000} >
                        {collection.items.map((it) => (
                            <Select.Item item={it} key={it.value} >
                                {it.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
})