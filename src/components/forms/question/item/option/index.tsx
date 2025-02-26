import { Box, IconButton } from "@mui/material";
import { TextField } from "../../../../table/styles";
import { TrashCan } from "@carbon/icons-react";

export const OptionItem = ({
    nestIndex,
    questionIndex,
    opIndex,
    register,
    removeOption,
}: {
    nestIndex: number;
    questionIndex: number;
    opIndex: number;
    register: any;
    removeOption: (index: number) => void;
}) => {
    return (
        <Box display="flex" alignItems="center" mb={1} gap={2}>
            <TextField
                label={`Alternativa ${opIndex + 1}`}
                variant="filled"
                fullWidth
                margin="dense"
                {...register(`exams.${nestIndex}.questions.${questionIndex}.options.${opIndex}.text`)}
            />
            <IconButton onClick={() => removeOption(opIndex)} color="error">
                <TrashCan />
            </IconButton>
        </Box>
    )
}

