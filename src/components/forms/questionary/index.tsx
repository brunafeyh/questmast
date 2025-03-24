import React from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import {
    Box,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Divider,
    MenuItem,
} from "@mui/material";
import { useAuth } from "../../../hooks/use-auth";
import { useSubjectTopicsById } from "../../../hooks/use-subjects-topic-by-id";
import { useSubjects } from "../../../hooks/use-subject";
import { useQuestionDifficulty } from "../../../hooks/use-question-difficulty";

type QuestionnaireFormInputs = {
    name: string;
    studentEmail: string;
    isPublic: boolean;
    questionnaireQuestionFormDTOList: {
        subjectId: number;
        subjectTopicIds: number[];
        quantity: number;
        questionDifficultyLevelIds: number[];
    }[];
    questionFilterDTO: {
        boardExaminerIds: number[];
        institutionIds: number[];
        functionIds: number[];
        questionDifficultyLevelIds: number[];
        subjectFilterDTOList: {
            subjectId: number;
            subjectTopicIds: number[];
        }[];
    };
}

const parseCommaSeparatedNumbers = (v: any) => {
    if (typeof v === "string") {
        return v
            .split(",")
            .map((num: string) => Number(num.trim()))
            .filter((n: number) => !isNaN(n));
    }
    return v;
};

const QuestionnaireForm: React.FC = () => {
    const { user } = useAuth();
    const { subjects } = useSubjects();
    const { questionDifficulty } = useQuestionDifficulty();

    const defaultValues: QuestionnaireFormInputs = {
        name: "",
        studentEmail: user?.email || "",
        isPublic: false,
        questionnaireQuestionFormDTOList: [
            { subjectId: 0, subjectTopicIds: [], quantity: 0, questionDifficultyLevelIds: [] },
        ],
        questionFilterDTO: {
            boardExaminerIds: [],
            institutionIds: [],
            functionIds: [],
            questionDifficultyLevelIds: [],
            subjectFilterDTOList: [{ subjectId: 0, subjectTopicIds: [] }],
        },
    };

    const { register, handleSubmit, control } = useForm<QuestionnaireFormInputs>({
        defaultValues,
    });

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: "questionnaireQuestionFormDTOList",
    })

    const onSubmit = (data: QuestionnaireFormInputs) => {
        console.log("Submitted data:", data);
    }

    const QuestionField: React.FC<{ index: number }> = ({ index }) => {
        const selectedSubjectId = useWatch({
            control,
            name: `questionnaireQuestionFormDTOList.${index}.subjectId`,
        })

        const { subjectsTopics, isLoading } = useSubjectTopicsById(selectedSubjectId, {
            enabled: !!selectedSubjectId,
        })

        return (
            <Box
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 2,
                    mb: 2,
                }}
            >
                <Typography variant="subtitle1">Question {index + 1}</Typography>
                <TextField
                    label="Subject"
                    select
                    {...register(`questionnaireQuestionFormDTOList.${index}.subjectId`, {
                        valueAsNumber: true,
                    })}
                    fullWidth
                    sx={{ mb: 1 }}
                >
                    {subjects?.map((subject: any) => (
                        <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Controller
                    name={`questionnaireQuestionFormDTOList.${index}.subjectTopicIds` as const}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <TextField
                            label="Subject Topics"
                            select
                            SelectProps={{ multiple: true }}
                            value={field.value || []}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            {isLoading ? (
                                <MenuItem disabled>Loading...</MenuItem>
                            ) : (
                                subjectsTopics?.map((topic: any) => (
                                    <MenuItem key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </MenuItem>
                                ))
                            )}
                        </TextField>
                    )}
                />
                <TextField
                    label="Quantity"
                    type="number"
                    {...register(`questionnaireQuestionFormDTOList.${index}.quantity`, {
                        valueAsNumber: true,
                    })}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <Controller
                    name={`questionnaireQuestionFormDTOList.${index}.questionDifficultyLevelIds` as const}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <TextField
                            label="Difficulty Level IDs"
                            select
                            SelectProps={{ multiple: true }}
                            value={field.value || []}
                            onChange={(e) => field.onChange(e.target.value)}
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            {questionDifficulty?.map((level: any) => (
                                <MenuItem key={level.id} value={level.id}>
                                    {level.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <Button variant="outlined" onClick={() => removeQuestion(index)}>
                    Remove Question
                </Button>
            </Box>
        );
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <Typography >Questionário</Typography>
            <Divider />

            <TextField
                label="Name"
                variant="filled"
                {...register("name", { required: true })}
                fullWidth
            />
            <FormControlLabel
                control={<Checkbox {...register("isPublic")} />}
                label="Público"
            />

            <Divider sx={{ my: 2 }} />

            <TextField
                label="Board Examiner IDs (comma separated)"
                {...register("questionFilterDTO.boardExaminerIds", {
                    setValueAs: parseCommaSeparatedNumbers,
                })}
                fullWidth
            />
            <TextField
                label="Institution IDs (comma separated)"
                {...register("questionFilterDTO.institutionIds", {
                    setValueAs: parseCommaSeparatedNumbers,
                })}
                fullWidth
            />
            <TextField
                label="Function IDs (comma separated)"
                {...register("questionFilterDTO.functionIds", {
                    setValueAs: parseCommaSeparatedNumbers,
                })}
                fullWidth
            />
            <TextField
                label="Difficulty Level IDs (comma separated)"
                {...register("questionFilterDTO.questionDifficultyLevelIds", {
                    setValueAs: parseCommaSeparatedNumbers,
                })}
                fullWidth
            />

            <Typography >Questões</Typography>
            {questionFields.map((field, index) => (
                <QuestionField key={field.id} index={index} />
            ))}
            <Button
                variant="contained"
                onClick={() =>
                    appendQuestion({
                        subjectId: 0,
                        subjectTopicIds: [],
                        quantity: 0,
                        questionDifficultyLevelIds: [],
                    })
                }
            >
                Add Question
            </Button>

            <Divider sx={{ my: 2 }} />


            <Box sx={{ mt: 3 }}>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default QuestionnaireForm
