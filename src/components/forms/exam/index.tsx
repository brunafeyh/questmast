import { Box, Button, Collapse, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";
import { JUICY_COLORS } from "../../../themes/colors";
import { ChevronDown, ChevronUp, TrashCan } from "@carbon/icons-react";
import { TextField } from "../../table/styles";
import { QuestionForm } from "../question";

export const ExamForm = ({
    register,
    control,
    nestIndex,
    remove: removeExam,
}: {
    register: any;
    control: any;
    nestIndex: number;
    remove: (index: number) => void;
}) => {
    const [showQuestions, setShowQuestions] = useState(true);

    return (
        <Paper elevation={1} sx={{ mb: 4, p: 1 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography fontWeight={FONT_WEIGHTS.regular} fontSize={16}>
                    Prova {nestIndex + 1}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button
                        startIcon={
                            <TrashCan
                                style={{
                                    width: 16,
                                    height: 16,
                                    color: JUICY_COLORS.error.c50,
                                }}
                            />
                        }
                        onClick={() => removeExam(nestIndex)}
                    >
                        Remover Prova
                    </Button>
                    <IconButton onClick={() => setShowQuestions(!showQuestions)}>
                        {showQuestions ? <ChevronUp /> : <ChevronDown />}
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="filled"
                        label="Nome"
                        fullWidth
                        {...register(`exams.${nestIndex}.name`)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="filled"
                        label="Cargo"
                        fullWidth
                        {...register(`exams.${nestIndex}.position`)}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <Collapse in={showQuestions} timeout="auto" unmountOnExit>
                <QuestionForm
                    nestIndex={nestIndex}
                    register={register}
                    control={control}
                />
            </Collapse>
        </Paper>
    )
}