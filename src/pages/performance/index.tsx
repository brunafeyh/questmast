import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { PageLayout } from '../../layout';
import { FONT_WEIGHTS } from '../../utils/constants/theme';
import { Tab, Tabs } from '../home/styles';
import PerformanceGeralData from '../../components/performance-data';
import QuestionsAnsweredChart from '../../components/charts/questions-aswered';
import AccuracyPercentageChart from '../../components/charts/hits-per-month';
import { QuestionaryTable } from '../../components/questionary-list';

const TITLE = 'Desempenho';

const Performance: FC = () => {
    const theme = useTheme()
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <PageLayout title={TITLE}>
            <Paper
                elevation={0}
                sx={{
                    minWidth: 1220,
                    '@media screen and (min-width: 1800px)': {
                        width: 1610
                    },
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                }}
            >
                <Typography
                    fontSize={(theme) => theme.spacing(2.5)}
                    fontWeight={FONT_WEIGHTS.medium}
                    sx={{ mb: 2 }}
                >
                    {TITLE}
                </Typography>

                <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }} scrollButtons="auto">
                    <Tab label="Dados Gerais" />
                    <Tab label="Questionários" />
                </Tabs>

                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: (theme) => theme.palette.background.paper,
                        borderRadius: 2,
                        pb: 3,
                        pt: 2,
                        overflowY: 'auto',
                        overflowX: 'auto',
                        "&::-webkit-scrollbar": {
                            width: theme.spacing(1)
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: theme.palette.juicy.neutral.c30,
                            borderRadius: theme.spacing(0.5),
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: theme.palette.juicy.neutral.c50,
                            borderRadius: theme.spacing(0.5),
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: theme.palette.juicy.neutral.c60,
                        },
                    }}
                >
                    {value === 0 && (
                        <>
                            <PerformanceGeralData />
                            <QuestionsAnsweredChart />
                            <AccuracyPercentageChart />
                        </>
                    )}

                    {value === 1 && (
                        <QuestionaryTable />
                    )}
                </Box>
            </Paper>
        </PageLayout>
    );
};

export default Performance;
