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

const data = [
  { month: "Jan", acertos: 6000, erros: 9500 },
  { month: "Feb", acertos: 6200, erros: 9800 },
  { month: "Mar", acertos: 5900, erros: 9700 },
  { month: "Apr", acertos: 6400, erros: 9600 },
  { month: "May", acertos: 6000, erros: 9500 },
  { month: "Jun", acertos: 6100, erros: 9400 },
  { month: "Jul", acertos: 6200, erros: 9300 },
  { month: "Aug", acertos: 6150, erros: 9200 },
  { month: "Sep", acertos: 6300, erros: 9100 },
  { month: "Oct", acertos: 6400, erros: 9000 },
  { month: "Nov", acertos: 6500, erros: 8900 },
  { month: "Dec", acertos: 6550, erros: 8800 },
];

export const AccuracyPercentageChart: FC = () => {
  return (
    <Box sx={{ width: "100%", height: 400, mt: 8 }}>
      <Typography sx={{ mb: 2, fontWeight: FONT_WEIGHTS.extralight }}>
        Percentual de Acertos por Mês
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }} 
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
          <Legend
          />
          <Bar dataKey="acertos" fill="#00BFAE" name="Acertos" />
          <Bar dataKey="erros" fill="#F44336" name="Erros" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AccuracyPercentageChart;
