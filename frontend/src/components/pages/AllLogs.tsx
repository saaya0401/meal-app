import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useCallback, useState } from "react";
import { useAllLogs } from "../../hooks/useAllLogs";
import { MonthFilter } from "../molecules/MonthFilter";
import { Loading } from "../molecules/Loading";
import { MealLogDialog } from "../organisms/layout/MealLogDialog";
import { DailyMealCard } from "../organisms/mealLog/DailyMealCard";


export const AllLogs: FC = memo(() => {
    const { loading, getAllLogs } = useAllLogs();

    const currentMonth = new Date().toISOString().slice(0, 7);
    const [month, setMonth] = useState(currentMonth);
    const handleReset = useCallback(() => {
        setMonth(currentMonth);
    }, []);

    return (
        <Box>
            <MonthFilter value={ month } onChange={setMonth} onReset={handleReset} />
            {loading ? <Loading loadingWord="読み込み中..." />
                : (
                    <Wrap gap={{base: 3, md: 10}} justify="center" align="center">
                        <WrapItem>
                            <MealLogDialog
                                date="2025/08/11(月)"
                                dailyLogTrigger={
                                    <DailyMealCard percent={80} date="2025/08/11(月)" />
                                }
                            />
                        </WrapItem>
                        <WrapItem>
                            <MealLogDialog
                                date="2025/08/11(月)"
                                dailyLogTrigger={
                                    <DailyMealCard percent={80} date="2025/08/11(月)" />
                                }
                            />
                        </WrapItem>
                        <WrapItem>
                            <MealLogDialog
                                date="2025/08/11(月)"
                                dailyLogTrigger={
                                    <DailyMealCard percent={80} date="2025/08/11(月)" />
                                }
                            />
                        </WrapItem>
                        <WrapItem>
                            <MealLogDialog
                                date="2025/08/11(月)"
                                dailyLogTrigger={
                                    <DailyMealCard percent={80} date="2025/08/11(月)" />
                                }
                            />
                        </WrapItem>
                        <WrapItem>
                            <MealLogDialog
                                date="2025/08/11(月)"
                                dailyLogTrigger={
                                    <DailyMealCard percent={80} date="2025/08/11(月)" />
                                }
                            />
                        </WrapItem>
                    </Wrap>
                )}
        </Box>
    );
})