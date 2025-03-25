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
import { useAuth } from "../../../hooks/use-auth";
import { usePerformance } from "../../../hooks/use-performance";
import Loading from "../../loading";

export const QuestionsAnsweredChart: FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { performance, isLoading } = usePerformance(user?.email || "");

  if (isLoading) return <Loading />;

  const chartData = performance?.questionsPerMonth.map((item) => ({
    month: item.monthName,
    questions: item.count,
  })) || [];

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <Typography sx={{ mb: 4, fontWeight: FONT_WEIGHTS.extralight }}>
        Questões Respondidas por Mês
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
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
  )
}

export default QuestionsAnsweredChart