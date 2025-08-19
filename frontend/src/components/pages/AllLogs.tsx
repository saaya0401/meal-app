import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useAllLogs } from "../../hooks/useAllLogs";
import { MonthFilter } from "../molecules/MonthFilter";
import { Loading } from "../molecules/Loading";
import { MealLogDialog } from "../organisms/layout/MealLogDialog";
import { DailyMealCard } from "../organisms/mealLog/DailyMealCard";


export const AllLogs: FC = memo(() => {
    const { getAllLogs, loading, logs } = useAllLogs();

    useEffect(() => getAllLogs(), []);
    const [month, setMonth] = useState<string>("");
    const handleReset = useCallback(() => {
        setMonth("");
    }, []);

    return (
        <Box>
            <MonthFilter value={ month } onChange={setMonth} onReset={handleReset} />
            {loading ? <Loading loadingWord="読み込み中..." />
                : (
                    <Wrap gap={{ base: 3, md: 10 }} justify="center" align="center">
                        {logs.map((log) => (
                            <WrapItem key={log.date}>
                                <MealLogDialog
                                    date={log.date}
                                    dailyLogTrigger={
                                        <DailyMealCard percent={log.avg_percent * 10} date={log.formattedDate} />
                                    }
                                />
                            </WrapItem>
                        ))}
                    </Wrap>
                )}
        </Box>
    );
})