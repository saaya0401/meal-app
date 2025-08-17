import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { FC, memo } from "react";
import { SelectOption } from "../../../types/form";
import { useLogs } from "../../../hooks/useLogs";
import { useLogsContext } from "../../../providers/LogsContext";

export const SelectField: FC = memo(() => {
    const { selectedMealTime, setSelectedMealTime } = useLogsContext();
    const mealTimeItems = [
                    { label: "朝ごはん", value: "morning" },
                    { label: "昼ごはん", value: "noon" },
                    { label: "夜ごはん", value: "evening" },
                    { label: "その他", value: "other" },
        ];
    const collection = createListCollection<SelectOption>({ items:mealTimeItems });

    return (
        <Select.Root gap={0} w={{base: "170px", md: "280px"}} collection={collection} value={selectedMealTime ? [selectedMealTime] : []} onValueChange={(details) => {setSelectedMealTime(details.value[0] || null)}} >
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
                        {mealTimeItems.map((it) => (
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