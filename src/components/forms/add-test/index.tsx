import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { Add } from "@carbon/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { TestFormData } from "../../../types/test";
import { useProfessionalLevel } from "../../../hooks/use-professional-level";
import { FC } from "react";
import { useFunctions } from "../../../hooks/use-functions-";
import { useSelectionProcessTestMutations } from "../../../hooks/selection-process-test/use-selection-process-test-mutations";
import QuestionItem from "../question-item-form";
import Loading from "../../loading"
import { QuestionReturnIa } from "../../../types/question-return-ia";
import { convertQuestionsReturnIaToTestFormData } from "../../../utils/convert-test-to-test-form-data";

export type AddTestFormProps = {
    defaultTest?: QuestionReturnIa[]
}

const AddTestForm: FC<AddTestFormProps> = ({ defaultTest }) => {
    const { user } = useAuth()
    const defaultForm = convertQuestionsReturnIaToTestFormData(defaultTest || [], user?.email || '')
    const { id } = useParams()

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<TestFormData>({

        defaultValues: defaultTest ? defaultForm : {
            applicationDate: new Date().toISOString().split("T")[0],
            name: "",
            functionId: 0,
            professionalLevelId: 0,
            selectionProcessId: Number(id),
            contentModeratorEmail: user?.email,
            questionList: [],
        },
    });

    const { professionalLevel, isLoading: isLoadingProfessionalLevel } = useProfessionalLevel();
    const { functions, isLoading: isLoadingFunctions } = useFunctions()
    const navigate = useNavigate()

    const { createSelectionProcessTest } = useSelectionProcessTestMutations()

    const { fields: questionFields, append: addQuestion, remove: removeQuestion } = useFieldArray({
        control,
        name: "questionList",
    });

    const onSubmit = async (data: TestFormData) => {
        try {
            await createSelectionProcessTest.mutateAsync(data)
            navigate(`/selection-process/details/${id}`)
        }
        catch (err) {
            console.log(err)
        }
    }
    if (createSelectionProcessTest.isPending || isLoadingProfessionalLevel || isLoadingFunctions) return <Loading />

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            width: 1224,
            '@media screen and (min-width: 1800px)': {
                width: 1591
            },
        }}
        >
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        label="Nome da Prova"
                        {...register("name")}
                        variant="filled"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{
                            mb: 2, width: 595,
                            '@media screen and (min-width: 1800px)': {
                                width: 770
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Data de Aplicação"
                        type="date"
                        variant="filled"
                        {...register("applicationDate")}
                        error={!!errors.applicationDate}
                        helperText={errors.applicationDate?.message}
                        sx={{
                            mb: 2, width: 595,
                            '@media screen and (min-width: 1800px)': {
                                width: 770
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                        name="functionId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                select
                                label="Função"
                                {...field}
                                variant="filled"
                                error={!!errors.functionId}
                                helperText={errors.functionId?.message}
                                sx={{
                                    mb: 2, width: 595,
                                    '@media screen and (min-width: 1800px)': {
                                        width: 770
                                    }
                                }}
                            >
                                {isLoadingFunctions ? (
                                    <MenuItem disabled>Carregando...</MenuItem>
                                ) : (
                                    functions?.map((func) => (
                                        <MenuItem key={func.id} value={func.id}>
                                            {func.name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        )}
                    />

                    <Controller
                        name="professionalLevelId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                select
                                label="Nível Profissional"
                                {...field}
                                variant="filled"
                                error={!!errors.professionalLevelId}
                                helperText={errors.professionalLevelId?.message}
                                sx={{
                                    mb: 2, width: 595,
                                    '@media screen and (min-width: 1800px)': {
                                        width: 770
                                    },
                                }}
                            >
                                {isLoadingProfessionalLevel ? (
                                    <MenuItem disabled>Carregando...</MenuItem>
                                ) : (
                                    professionalLevel?.map((level) => (
                                        <MenuItem key={level.id} value={level.id}>
                                            {level.name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        )}
                    />

                </Box>
            </Box>

            <Typography sx={{ mt: 4, mb: 2 }} fontSize={18}>Questões</Typography>

            {questionFields.map((item, index) => (
                <QuestionItem
                    key={item.id}
                    index={index}
                    control={control}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    removeQuestion={removeQuestion}
                />
            ))}

            <Box display="flex" justifyContent="center" my={2}>
                <Button
                    variant="text"
                    startIcon={<Add />}
                    onClick={() =>
                        addQuestion({
                            name: "",
                            statement: "",
                            statementImage: "",
                            explanation: "",
                            videoExplanationUrl: "",
                            questionAlternativeList: [],
                            questionDifficultyLevelId: 0,
                            subjectId: 0,
                            subjectTopicList: [],
                        })
                    }
                >
                    Adicionar Questão
                </Button>
            </Box>
            <Box mt={4} >
                <Button variant="contained" color="primary" type="submit" sx={{ mb: 2 }}>
                    Salvar Prova
                </Button>
            </Box>
        </Box>
    )
}

export default AddTestForm