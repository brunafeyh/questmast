import { Add } from "@carbon/icons-react";
import { Box, Button, Paper } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { QuestionItem } from "./item";

export const QuestionForm = ({
    nestIndex,
    register,
    control,
}: {
    nestIndex: number;
    register: any;
    control: any;
}) => {
    const {
        fields: questionsFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: `exams.${nestIndex}.questions`,
    });

    return (
        <Paper elevation={0} sx={{ p: 0, mb: 0 }}>
            {questionsFields.map((question, index) => (
                <QuestionItem
                    key={question.id}
                    nestIndex={nestIndex}
                    questionIndex={index}
                    register={register}
                    control={control}
                    removeQuestion={removeQuestion}
                />
            ))}
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Button
                    startIcon={<Add />}
                    onClick={() =>
                        appendQuestion({
                            id: crypto.randomUUID(),
                            prompt: '',
                            options: [{ text: '' }],
                        })
                    }
                >
                    Adicionar Questão
                </Button>
            </Box>
        </Paper>
    )
}