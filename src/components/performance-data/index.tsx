import { FC } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

export const PerformanceGeralData: FC = () => {
    const data = [
        {
            title: "Tempo Médio de Resposta",
            value: "3 min",
            color: "#00BFAE",
        },
        {
            title: "Questionários Respondidos",
            value: "50",
            color: "#9C27B0",
        },
        {
            title: "Percentual Médio de Acertos",
            value: "80%",
            color: "#3F51B5",
        },
    ];

    return (
        <Grid container spacing={3}>
            {data.map((item, index) => (
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

export default PerformanceGeralData;
