import { Box, Button, Typography } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { JUICY_COLORS } from "../../../../themes/colors";
import { FONT_WEIGHTS } from "../../../../utils/constants/theme";
import { Add, TrashCan } from "@carbon/icons-react";
import { TextField } from "../../../table/styles";
import { OptionItem } from "./option";

export const QuestionItem = ({
    nestIndex,
    questionIndex,
    register,
    control,
    removeQuestion,
}: {
    nestIndex: number;
    questionIndex: number;
    register: any;
    control: any;
    removeQuestion: (index: number) => void;
}) => {
    const { fields: optionsFields, append: appendOption, remove: removeOption } =
        useFieldArray({
            control,
            name: `exams.${nestIndex}.questions.${questionIndex}.options`,
        });

    return (
        <Box
            mb={2}
            border={`1px solid ${JUICY_COLORS.neutral.c20}`}
            borderRadius={2}
            p={2}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >
                <Typography fontWeight={FONT_WEIGHTS.light}>
                    Questão {questionIndex + 1}
                </Typography>
                <Button
                    sx={{ color: JUICY_COLORS.error.c50 }}
                    startIcon={
                        <TrashCan
                            style={{
                                width: 16,
                                height: 16,
                                color: JUICY_COLORS.error.c50,
                            }}
                        />
                    }
                    onClick={() => removeQuestion(questionIndex)}
                    color="error"
                >
                    Remover Questão
                </Button>
            </Box>

            <TextField
                label="Enunciado"
                fullWidth
                variant="filled"
                multiline
                rows={3}
                margin="normal"
                {...register(`exams.${nestIndex}.questions.${questionIndex}.prompt`)}
            />

            {optionsFields.map((option, opIndex) => (
                <OptionItem
                    key={option.id}
                    nestIndex={nestIndex}
                    questionIndex={questionIndex}
                    opIndex={opIndex}
                    register={register}
                    removeOption={removeOption}
                />
            ))}

            <Button
                variant="text"
                startIcon={<Add />}
                onClick={() => appendOption({ text: '' })}
                sx={{ mt: 1 }}
            >
                Adicionar Alternativa
            </Button>
        </Box>
    )
}
