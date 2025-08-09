export type SelectOption = { label: string; value: string };

export type MenuItem = { name: string; amount: string };

export type HandleChange = (i: number, f: "name" | "amount", v: string) => void;