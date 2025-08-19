import { MenuItem } from "./form";

export type Gender = 'male' | 'female';

export type Profile = {
    id: number;
    name: string;
    image: string | null;
    gender: Gender;
    birthdate: string;
    weight_kg: number;
    breed: string | null;
    personality: string | null;
    is_multiple_dogs: boolean | null;
    companion_name: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export type MealTime = 'morning' | 'noon' | 'evening' | 'other';

export type MealLog = {
    id: number;
    profile_id: number;
    date: string;
    time: string;
    menu: MenuItem[];
    amount_percent: string;
    meal_time: MealTime;
    meal_time_note: string | null;
    memo: string | null;
    created_at: string;
    updated_at: string;
}

export type DashboardResponse = {
    profile: Profile;
    meal_log: MealLog | null;
}
