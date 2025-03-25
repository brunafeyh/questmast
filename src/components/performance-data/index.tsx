import { FC } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { usePerformance } from "../../hooks/use-performance";
import Loading from "../../components/loading";

export const PerformanceGeralData: FC = () => {
  const { user } = useAuth();
  const { performance, isLoading } = usePerformance(user?.email || "")

  if (isLoading) return <Loading />;

  const performanceData = performance
  ? [
      {
        title: "Tempo Médio de Resposta",
        value:
          performance.averageResponseTimeInSeconds < 60
            ? `${performance.averageResponseTimeInSeconds.toFixed(2)} seg`
            : `${(performance.averageResponseTimeInSeconds / 60).toFixed(3)} min`,
        color: "#00BFAE",
      },
      {
        title: "Questionários Respondidos",
        value: performance.numberOfQuestionnaires.toString(),
        color: "#9C27B0",
      },
      {
        title: "Percentual Médio de Acertos",
        value: `${performance.overallCorrectPercentage.toFixed(2)}%`,
        color: "#3F51B5",
      },
    ]
  : [];


  return (
    <Grid container spacing={3}>
      {performanceData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: "100%",
                backgroundColor: item.color,
                borderRadius: "4px",
              }}
            />
            <Box sx={{ width: "100%", textAlign: "center", p: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, mb: 1 }}
              >
                {item.title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {item.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PerformanceGeralData