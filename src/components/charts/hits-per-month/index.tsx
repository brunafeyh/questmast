import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";
import { useAuth } from "../../../hooks/use-auth";
import { usePerformance } from "../../../hooks/use-performance";
import Loading from "../../loading";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const AccuracyPercentageChart: FC = () => {
  const { user } = useAuth();
  const { performance, isLoading } = usePerformance(user?.email || "");

  if (isLoading) return <Loading />;

  const chartData = performance?.correctIncorrectPerMonth.map((item) => ({
    month: monthNames[item.month - 1] || item.month,
    acertos: item.correctCount,
    erros: item.incorrectCount,
  })) || [];

  return (
    <Box sx={{ width: "100%", height: 400, mt: 8 }}>
      <Typography sx={{ mb: 2, fontWeight: FONT_WEIGHTS.extralight }}>
        Percentual de Acertos por Mês
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{ value: "MÊS", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            label={{ value: "Questões", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />

          <Bar dataKey="acertos" fill="#00BFAE" name="Acertos" />
          <Bar dataKey="erros" fill="#F44336" name="Erros" />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" style={{ marginTop: 24 }} />

        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AccuracyPercentageChart;
