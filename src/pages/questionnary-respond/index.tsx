import React, { useEffect, useState } from "react";
import { Box, Button, Chip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { QuestionnaireList } from "../../types/questionarry-list";
import { Question } from "../../components/question";
import { PageLayout } from "../../layout";
import PagesDetailsHeader from "../../components/page-details-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionRespondForm, QuestionRespondFormSchema } from "../../types/questionnary-respond-form";
import { useQuestionnaryRespondMutations } from "../../hooks/use-questionnary-resolve";
import { QuestionaryRespond as ApiRespond } from "../../types/questionnary-respond";
import Loading from "../../components/loading";

export const QuestionaryRespond: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    
    const theme = useTheme()
    const questionnaire = (location.state as { questionnaire: QuestionnaireList })?.questionnaire;

    const { register, handleSubmit, setValue } = useForm<QuestionRespondForm>({
        resolver: zodResolver(QuestionRespondFormSchema),
        defaultValues: {
            questionnaireId: questionnaire?.id || 0,
            startDateTime: "",
            endDateTime: "",
            studentMainEmail: questionnaire?.student.mainEmail || "",
            solvedQuestionList: [],
        },
    });

    const { respondQuestionnary } = useQuestionnaryRespondMutations();

    const [_, setStartDateTime] = useState<string>("");
    const [solvedQuestionList, setSolvedQuestionList] = useState<
        {
            questionId: number;
            selectedAlternativeId: number;
            startDateTime: string;
            endDateTime: string;
        }[]
    >([]);

    const [apiResponse, setApiResponse] = useState<ApiRespond | null>(null);

    useEffect(() => {
        if (!questionnaire) {
            navigate("/questionary");
            return;
        }
        const now = new Date().toISOString();
        setStartDateTime(now);
        setValue("startDateTime", now);
        setValue("questionnaireId", questionnaire.id);
        setValue("studentMainEmail", questionnaire.student.mainEmail);
    }, [questionnaire, navigate, setValue]);

    const handleAnswerSelected = (questionIndex: number, selectedAlternativeId: number) => {
        const question = questionnaire.questionList[questionIndex];
        const now = new Date().toISOString();

        setSolvedQuestionList((prev) => {
            const existing = prev.find((q) => q.questionId === question.id);
            let newSolved;
            if (!existing) {
                newSolved = [
                    ...prev,
                    {
                        questionId: question.id,
                        selectedAlternativeId,
                        startDateTime: now,
                        endDateTime: now,
                    },
                ];
            } else {
                newSolved = prev.map((q) =>
                    q.questionId === question.id
                        ? { ...q, selectedAlternativeId, endDateTime: now }
                        : q
                );
            }
            setValue("solvedQuestionList", newSolved);
            return newSolved;
        });
    }

    const onSubmit = async (data: QuestionRespondForm) => {
        const submissionEnd = new Date().toISOString();
        const payload = { ...data, endDateTime: submissionEnd };
        console.log("📤 Enviando questionário:", payload);
        try {
            const response = await respondQuestionnary.mutateAsync(payload);
            setApiResponse(response);
        } catch (err) {
            console.error("Erro ao enviar questionário:", err);
        }
    }

    if (!questionnaire) return null

    if (respondQuestionnary.isPending) return <Loading />

    return (
        <PageLayout title="Responder Questionário">
            <Box  sx={{
                        flexGrow: 1,
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
                <PagesDetailsHeader title="Responder Questionário" />
                {apiResponse && (
                    <Box mb={2} mt={2}>
                        <Chip
                            label={`Acertos: ${apiResponse.quantityOfCorrectAnswers}`}
                            color="primary"
                            sx={{ mb: 2 }}
                        />
                    </Box>
                )}
                {questionnaire.questionList.map((question, index) => {
                    let selectedAnswer: number | undefined
                    let questionToPass = question

                    if (apiResponse) {
                        const solvedQuestion = apiResponse.solvedQuestionList.find(
                            (sq) => sq.question.id === question.id
                        );
                        if (solvedQuestion && solvedQuestion.questionAlternative) {
                            const { isGeneratedByAi, ...rest } = solvedQuestion.question;
                            questionToPass = { ...rest, isGeneratedByAi: isGeneratedByAi ?? false };
                            selectedAnswer = solvedQuestion.questionAlternative.id;
                        }
                    } else {
                        selectedAnswer =
                            solvedQuestionList.find((s) => s.questionId === question.id)
                                ?.selectedAlternativeId;
                    }
                    return (
                        <Question
                            key={question.id}
                            question={questionToPass}
                            index={index}
                            register={register}
                            wasSubmitted={Boolean(apiResponse)}
                            selectedAnswer={selectedAnswer}
                            onAnswerSelected={!apiResponse ? handleAnswerSelected : undefined}
                        />
                    );
                })}


                {!apiResponse && (
                    <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                        Enviar Respostas
                    </Button>
                )}
            </Box>
        </PageLayout>
    );
};
