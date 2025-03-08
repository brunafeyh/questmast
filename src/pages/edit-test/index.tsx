import { FC, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { Add } from "@carbon/icons-react";
import { PageLayout } from "../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useProfessionalLevel } from "../../hooks/use-professional-level";
import { useFunctions } from "../../hooks/use-functions-";
import QuestionItem from "../../components/forms/question-item-form";
import { useSelectionProcessTestMutations } from "../../hooks/selection-process-test/use-selection-process-test-mutations";
import Loading from "../../components/loading";
import { useSelectionProcessesTestById } from "../../hooks/selection-process-test/use-selection-process-test-by-id";
import { TestFormData } from "../../types/test";
import { getDefaultSelectionProcessTest } from "../../utils/get-default-test";
import { emptyDefaults } from "../../utils/constants/default";

const EditTest: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { selectionProcessTest, isLoading: isLoadingTest } = useSelectionProcessesTestById(Number(id));
    const { updateSelectionProcessTest } = useSelectionProcessTestMutations();
    const { professionalLevel, isLoading: isLoadingProfessionalLevel } = useProfessionalLevel();
    const { functions, isLoading: isLoadingFunctions } = useFunctions();

    const isLoading =
        isLoadingTest ||
        isLoadingFunctions ||
        isLoadingProfessionalLevel ||
        updateSelectionProcessTest.isPending;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<TestFormData>({
        defaultValues: selectionProcessTest
            ? getDefaultSelectionProcessTest(selectionProcessTest)
            : emptyDefaults,
    })

    useEffect(() => {
        if (selectionProcessTest) {
            reset(getDefaultSelectionProcessTest(selectionProcessTest));
        }
    }, [selectionProcessTest, reset]);

    const { fields: questionFields, append: addQuestion, remove: removeQuestion } = useFieldArray({
        control,
        name: "questionList",
    });

    const onSubmit = async (data: TestFormData) => {
        try {
            await updateSelectionProcessTest.mutateAsync({ form: data, id: Number(id) });
            navigate(`/selection-process/details/${selectionProcessTest?.selectionProcess.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) return <Loading />

    return (
        <PageLayout title="Editar Prova">
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: 1224,
                    '@media screen and (min-width: 1800px)': {
                        width: 1591,
                    },
                }}
            >
                <Typography sx={{ mb: 2 }} fontSize={18}>
                    Editar Prova
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            label="Nome da Prova"
                            {...register("name")}
                            variant="filled"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            sx={{
                                mb: 2,
                                width: 595,
                                '@media screen and (min-width: 1800px)': {
                                    width: 770,
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
                                mb: 2,
                                width: 595,
                                '@media screen and (min-width: 1800px)': {
                                    width: 770,
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Controller
                            name="functionId"
                            control={control}
                            defaultValue={selectionProcessTest ? getDefaultSelectionProcessTest(selectionProcessTest).functionId : 0}
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
                                        mb: 2,
                                        width: 595,
                                        '@media screen and (min-width: 1800px)': {
                                            width: 770,
                                        },
                                    }}
                                >
                                    {functions?.map((func) => (
                                        <MenuItem key={func.id} value={func.id}>
                                            {func.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Controller
                            name="professionalLevelId"
                            control={control}
                            defaultValue={selectionProcessTest ? getDefaultSelectionProcessTest(selectionProcessTest).professionalLevelId : 0}
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
                                        mb: 2,
                                        width: 595,
                                        '@media screen and (min-width: 1800px)': {
                                            width: 770,
                                        },
                                    }}
                                >
                                    {professionalLevel?.map((level) => (
                                        <MenuItem key={level.id} value={level.id}>
                                            {level.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Box>
                </Box>
                <Typography sx={{ mt: 4, mb: 2 }} fontSize={18}>
                    Questões
                </Typography>
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
                <Box mt={4}>
                    <Button variant="contained" color="primary" type="submit" sx={{ mb: 2 }}>
                        Salvar Prova
                    </Button>
                </Box>
            </Box>
        </PageLayout>
    );
};

export default EditTest;
