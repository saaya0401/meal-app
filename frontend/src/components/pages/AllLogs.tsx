import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { MonthFilter } from "../molecules/MonthFilter";
import { Loading } from "../molecules/Loading";
import { MealLogDialog } from "../organisms/layout/MealLogDialog";
import { DailyMealCard } from "../organisms/mealLog/DailyMealCard";
import { useAllLogsContext } from "../../providers/AllLogsContext";


export const AllLogs: FC = memo(() => {
    const { getAllLogs, loading, logs } = useAllLogsContext();

    const currentMonth = new Date().toISOString().slice(0, 7);
    const [month, setMonth] = useState(currentMonth);
    const handleReset = useCallback(() => { setMonth(currentMonth); }, []);
    useEffect(() => getAllLogs(), []);

    const filteredLogs = logs.filter((log) => {
        return log.date.slice(0, 7) === month;
    });

    return (
        <Box>
            <MonthFilter value={ month } onChange={setMonth} onReset={handleReset} />
            {loading ? <Loading loadingWord="読み込み中..." />
                : (
                    <Wrap gap={{ base: 3, md: 10 }} justify="center" align="center">
                        {filteredLogs.map((log) => (
                            <WrapItem key={log.date}>
                                <MealLogDialog
                                    date={log.date}
                                    formattedDate = {log.formattedDate}
                                    dailyLogTrigger={
                                        <DailyMealCard percent={log.avg_percent * 10} date={log.formattedDate} />
                                    }
                                    onUpdated={getAllLogs}
                                />
                            </WrapItem>
                        ))}
                    </Wrap>
                )}
        </Box>
    );
})