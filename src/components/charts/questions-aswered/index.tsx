import { FC } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";

const data = [
    { month: "Jan", questions: 5000 },
    { month: "Feb", questions: 7000 },
    { month: "Mar", questions: 8500 },
    { month: "Apr", questions: 10000 },
    { month: "May", questions: 12000 },
    { month: "Jun", questions: 14000 },
    { month: "Jul", questions: 15500 },
    { month: "Aug", questions: 17000 },
    { month: "Sep", questions: 18500 },
    { month: "Oct", questions: 19000 },
    { month: "Nov", questions: 19500 },
    { month: "Dec", questions: 20000 },
];

export const QuestionsAnsweredChart: FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", height: 400, mt: 2 }}>
            <Typography  sx={{ mb: 4, fontWeight: FONT_WEIGHTS.extralight }}>
                Questões Respondidas por Mês
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "MÊS", position: "insideBottom", offset: -10 }} />
                    <YAxis label={{ value: "Questões", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="questions"
                        stroke={theme.palette.primary.main}
                        fillOpacity={1}
                        fill="url(#colorQuestions)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default QuestionsAnsweredChart;
