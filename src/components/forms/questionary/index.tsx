import React from "react";
import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
import {
    Box,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Divider,
    MenuItem,
    Paper,
} from "@mui/material";
import { useAuth } from "../../../hooks/use-auth";
import { useInstitution } from "../../../hooks/use-institution";
import { useBoardExaminer } from "../../../hooks/use-board-examiner";
import { useFunctions } from "../../../hooks/use-functions-";
import { QuestionField } from "./question-fields";
import { QuestionnaireForm as QuestionnaireFormType } from "../../../types/questionnaire";
import { useNavigate } from "react-router-dom";
import QuestionnaryService from "../../../services/questionnary";


const QuestionnaireForm: React.FC = () => {
    const { user } = useAuth();

    const defaultValues: QuestionnaireFormType = {
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
        },
    }

    const { institutions } = useInstitution();
    const { boardExaminers } = useBoardExaminer();
    const { functions } = useFunctions()

    const methods = useForm<QuestionnaireFormType>({
        defaultValues,
    });

    const { register, handleSubmit, control } = methods;


    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: "questionnaireQuestionFormDTOList",
    })

    const navigate = useNavigate();

    const onSubmit = async (data: QuestionnaireFormType) => {
        try {
            const service = new QuestionnaryService();
            const created = await service.createQuestionnary(data);
            navigate("/questionary/respond", {
                state: { questionnaire: created },
            });
        } catch (error) {
            console.error("Erro ao criar questionário:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, width: 1210 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        Questionário
                    </Typography>
                    <Button variant="contained">
                        Usar Inteligência Artificial
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
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

                    <Box display={'flex'} flexDirection={'row'} gap={2}>

                        <Controller
                            control={control}
                            name="questionFilterDTO.boardExaminerIds"
                            render={({ field }) => (
                                <TextField
                                    label="Bancas examinadoras"
                                    select
                                    variant="filled"
                                    SelectProps={{ multiple: true }}
                                    value={field.value || []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    fullWidth
                                >
                                    {boardExaminers?.map((banca) => (
                                        <MenuItem key={banca.id} value={banca.id}>
                                            {banca.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            control={control}
                            name="questionFilterDTO.institutionIds"
                            render={({ field }) => (
                                <TextField
                                    label="Instituições"
                                    select
                                    variant="filled"
                                    SelectProps={{ multiple: true }}
                                    value={field.value || []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    fullWidth
                                >
                                    {institutions?.map((inst) => (
                                        <MenuItem key={inst.id} value={inst.id}>
                                            {inst.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Controller
                            control={control}
                            name="questionFilterDTO.functionIds"
                            render={({ field }) => (
                                <TextField
                                    label="Cargos"
                                    select
                                    variant="filled"
                                    SelectProps={{ multiple: true }}
                                    value={field.value || []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    fullWidth
                                >
                                    {functions?.map((func) => (
                                        <MenuItem key={func.id} value={func.id}>
                                            {func.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Box>

                    <Typography >Questões</Typography>
                    {questionFields.map((field, index) => (
                        <QuestionField key={field.id} index={index} removeQuestion={removeQuestion} />
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
                        Adicionar
                    </Button>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Button variant="contained" type="submit">
                            Concluir
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </FormProvider>
    )
}

export default QuestionnaireForm
