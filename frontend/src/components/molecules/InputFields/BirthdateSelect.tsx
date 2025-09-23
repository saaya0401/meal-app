"use client"
import { FC, memo, useState } from "react";
import { createListCollection, Flex, Portal, Select } from "@chakra-ui/react";

type Props = {
    birthYear: string | "";
    birthMonth: string | "";
    birthDay: string | "";
    setBirthYear: (val: string) => void;
    setBirthMonth: (val: string) => void;
    setBirthDay: (val: string) => void;
}

const createNumberOptions = (list: number[], unit?: string) => list.map((n) => ({ label: unit ? `${n}${unit}` : String(n), value: String(n) }));

export const BirthdateSelect: FC<Props> = memo((props) => {
    const { birthYear, birthMonth, birthDay, setBirthYear, setBirthMonth, setBirthDay} = props;
    const thisYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => thisYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
    const days = (birthYear && birthMonth) ? Array.from({ length: daysInMonth(Number(birthYear), Number(birthMonth)) }, (_, i) => i + 1) : [];

    const yearOptions = createListCollection({ items: createNumberOptions(years, "年") });
    const monthOptions = createListCollection({ items: createNumberOptions(months, "月") });
    const dayOptions = createListCollection({ items: createNumberOptions(days, "日") });
    return (
            <Flex gap={3} w="100%">
                <Select.Root collection={yearOptions} value={birthYear ? [birthYear] : []} onValueChange={(details) => {
                    const val = details.value[0];
                    setBirthYear(val || "");
                    setBirthDay("");
                }} size="sm">
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="年" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content zIndex={4000}>
                                {yearOptions.items.map((it) => (
                                    <Select.Item item={it} key={it.value}>
                                        {it.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Select.Root collection={monthOptions} value={birthMonth ? [birthMonth] : []} onValueChange={(details) => {
                    const val = details.value[0];
                    setBirthMonth(val || "");
                    setBirthDay("");
                }} size="sm">
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="月" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content zIndex={3000}>
                                {monthOptions.items.map((it) => (
                                    <Select.Item item={it} key={it.value}>
                                        {it.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Select.Root
                    collection={dayOptions} value={birthDay ? [birthDay] : []} onValueChange={(details) => {
                        const val = details.value[0];
                        setBirthDay(val || "");
                    }} size="sm" disabled={!birthYear || !birthMonth}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="日" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content zIndex={3000}>
                                {dayOptions.items.map((it) => (
                                    <Select.Item item={it} key={it.value}>
                                        {it.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Flex>
    )
});