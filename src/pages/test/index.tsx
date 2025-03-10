import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Chip,
    Typography,
    useTheme,
} from "@mui/material";
import { PageLayout } from "../../layout";
import { Question } from "../../components/question";
import PagesDetailsHeader from "../../components/page-details-header";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { useAuth } from "../../hooks/use-auth";
import { Edit, TrashCan } from "@carbon/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, useModal } from "../../components/modal";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { useSelectionProcessTestMutations } from "../../hooks/selection-process-test/use-selection-process-test-mutations";
import Loading from "../../components/loading";
import { useSelectionProcessesTestById } from "../../hooks/selection-process-test/use-selection-process-test-by-id";
import { useTestResponseById } from "../../hooks/selection-process-test/use-test-response";
import { createSolvedQuestionList, computeCorrectCount, QuestionTime } from "../../utils/test";

type FormData = { responses: number[] };

const TestPage: FC = () => {
    const theme = useTheme();
    const { isStudante, isAuthenticated, user } = useAuth();
    const email = user?.email;
    const navigate = useNavigate();
    const { id } = useParams()

    const { selectionProcessTestResponse, isLoading: isLoadingResponse, refetch } = useTestResponseById(Number(id), email || "");
    const originalSolvedTest =
        selectionProcessTestResponse
            ? selectionProcessTestResponse
            : null

    const [isRedo, setIsRedo] = useState<boolean>(false);
    const solvedTest = isRedo ? null : originalSolvedTest;

    const modal = useModal()
    const { selectionProcessTest, isLoading: isTestLoading } = useSelectionProcessesTestById(Number(id));
    const { deleteSelectionProcessTest, respondSelectionProcessTest } = useSelectionProcessTestMutations();

    let defaultResponses: number[] = [];
    if (selectionProcessTest) {
        defaultResponses = selectionProcessTest.questionList.map(() => -1);
    }
    const { register, handleSubmit, watch, reset } = useForm<FormData>({
        defaultValues: { responses: defaultResponses },
    })

    const [testStartTime, setTestStartTime] = useState<string>(new Date().toISOString());

    let initialTimes: QuestionTime[] = [];
    if (selectionProcessTest) {
        initialTimes = selectionProcessTest.questionList.map(() => ({ startDateTime: "", endDateTime: "" }));
    }
    const [questionTimes, setQuestionTimes] = useState<QuestionTime[]>(initialTimes);

    useEffect(() => {
        if (selectionProcessTest) {
            reset({ responses: selectionProcessTest.questionList.map(() => -1) });
            setQuestionTimes(selectionProcessTest.questionList.map(() => ({ startDateTime: "", endDateTime: "" })));
            setTestStartTime(new Date().toISOString());
        }
    }, [selectionProcessTest, reset]);

    const handleAnswerSelected = (questionIndex: number) => {
        setQuestionTimes((prev) => {
            const newTimes = [...prev];
            const now = new Date().toISOString();
            if (!newTimes[questionIndex].startDateTime) {
                newTimes[questionIndex].startDateTime = now;
            }
            newTimes[questionIndex].endDateTime = now;
            return newTimes;
        });
    }

    const onSubmit = async (data: FormData) => {
        const testEndTime = new Date().toISOString();
        const solvedQuestionList = createSolvedQuestionList({
            questionList: selectionProcessTest!.questionList,
            responses: data.responses,
            questionTimes,
            testStartTime,
            testEndTime,
            solvedTest,
        });
        const solvedPayload = {
            selectionProcessTestId: selectionProcessTest!.id,
            startDateTime: testStartTime,
            endDateTime: testEndTime,
            studentMainEmail: email || "",
            solvedQuestionList,
        };

        try {
            await respondSelectionProcessTest.mutateAsync(solvedPayload);
            await refetch();
        } catch (error) {
            console.error("Erro ao enviar o teste:", error);
        }
    };


    const deleteModal = useModal();
    const handleOpenDeleteModal = () => deleteModal.current?.openModal();
    const handleCloseDeleteModal = () => deleteModal.current?.closeModal();

    useEffect(() => {
        if (selectionProcessTestResponse) {
            setIsRedo(false);
        }
    }, [selectionProcessTestResponse]);


    const handleRedoConfirm = () => {
        setIsRedo(true);
        if (selectionProcessTest) {
            reset({ responses: selectionProcessTest.questionList.map(() => -1) });
            setQuestionTimes(selectionProcessTest.questionList.map(() => ({ startDateTime: "", endDateTime: "" })));
            setTestStartTime(new Date().toISOString());
        }
        modal.current?.closeModal();
    };

    const isLoading =
        isTestLoading ||
        deleteSelectionProcessTest.isPending ||
        respondSelectionProcessTest.isPending ||
        isLoadingResponse;

    const correctCount = computeCorrectCount(solvedTest);

    if (isLoading || isLoadingResponse) return <Loading />;

    return (
        <PageLayout title="Test">
            <Box
                sx={{
                    maxHeight: "80vh",
                    width: 1200,
                    "&::-webkit-scrollbar": { width: theme.spacing(1) },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: theme.palette.grey[300],
                        borderRadius: theme.spacing(0.5),
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.palette.grey[500],
                        borderRadius: theme.spacing(0.5),
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: theme.palette.grey[600],
                    },
                }}
            >
                <PagesDetailsHeader
                    title={`Test - ${selectionProcessTest!.name}`}
                    rightSideComponents={
                        !isAuthenticated
                            ? undefined
                            : [
                                isStudante && solvedTest && !isRedo ? (
                                    <Button
                                        key="redoTest"
                                        variant="text"
                                        onClick={() => modal.current?.openModal()}
                                        startIcon={<Edit style={{ width: 16, height: 16 }} />}
                                    >
                                        Refazer Questionário
                                    </Button>
                                ) : null,
                                !isStudante ? (
                                    <>
                                        <Button
                                            key="editTest"
                                            variant="text"
                                            onClick={() => navigate(`/edit-test/${id}`)}
                                            startIcon={<Edit style={{ width: 16, height: 16 }} />}
                                        >
                                            Editar
                                        </Button>,
                                        <Button
                                            key="deleteTest"
                                            sx={{ color: theme.palette.juicy.error.c50 }}
                                            variant="text"
                                            onClick={handleOpenDeleteModal}
                                            startIcon={<TrashCan style={{ width: 16, height: 16 }} />}
                                        >
                                            Deletar Prova
                                        </Button>,
                                    </>
                                ) : null

                            ]
                    }
                />

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} mb={2} mr={2}>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography>Data de aplicação</Typography>
                        <Typography fontWeight={FONT_WEIGHTS.light} sx={{ mb: 2 }}>
                            {selectionProcessTest!.applicationDate}
                        </Typography>
                    </Box>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography>Cargo</Typography>
                        <Typography fontWeight={FONT_WEIGHTS.light}>
                            {selectionProcessTest!.function.name}
                        </Typography>
                        <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light}>
                            {selectionProcessTest!.function.description}
                        </Typography>
                    </Box>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography>Nível Institucional</Typography>
                        <Typography fontWeight={FONT_WEIGHTS.light}>
                            {selectionProcessTest!.professionalLevel.name}
                        </Typography>
                        <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light}>
                            {selectionProcessTest!.professionalLevel.description}
                        </Typography>
                    </Box>
                </Box>

                {correctCount !== null && (
                    <Box sx={{ mb: 2, textAlign: "center" }}>
                        <Chip label={`Você acertou ${correctCount} de ${selectionProcessTest!.questionList.length} questões.`} />
                    </Box>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {selectionProcessTest!.questionList.map((question, i) => {
                        let selectedAnswer: number | undefined;
                        if (solvedTest && !isRedo) {
                            const solvedQuestion = solvedTest?.solvedQuestionList?.find((sq: any) => sq.question.id === question.id);
                            if (solvedQuestion && solvedQuestion.questionAlternative) {
                                selectedAnswer = question.questionAlternativeList.findIndex(
                                    (alt) => alt.id === solvedQuestion.questionAlternative.id
                                );
                            }
                        } else {
                            selectedAnswer = watch("responses")[i];
                        }
                        return (
                            <Question
                                key={question.id}
                                question={question}
                                index={i}
                                register={register}
                                selectedAnswer={selectedAnswer}
                                wasSubmitted={!!solvedTest && !isRedo}
                                onAnswerSelected={handleAnswerSelected}
                            />
                        );
                    })}

                    <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "flex-end" }}>
                        <Button variant="outlined" type="button" onClick={() => console.log("Cancel")}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            Concluir
                        </Button>
                    </Box>
                </form>
            </Box>

            <Modal ref={deleteModal}>
                <ConfirmationModal
                    text="Você tem cereteza que deseja excluir a prova?"
                    onCancel={handleCloseDeleteModal}
                    onConfirm={() =>
                        deleteSelectionProcessTest.mutateAsync({ id: Number(id), email: email || "" })
                    }
                />
            </Modal>

            <Modal ref={modal}>
                <ConfirmationModal
                    header='Confirmação'
                    text="Você realmente deseja refazer o questionário?"
                    description="Todos os dados anteriores serão descartados!"
                    conclusionText={'Prosseguir'}
                    onCancel={() => modal.current?.closeModal()}
                    onConfirm={handleRedoConfirm}
                />
            </Modal>
        </PageLayout>
    );
};

export default TestPage;
