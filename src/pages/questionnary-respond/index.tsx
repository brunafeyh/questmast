import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { QuestionnaireList } from "../../types/questionarry-list";
import { Question } from "../../components/question";
import { PageLayout } from "../../layout";
import PagesDetailsHeader from "../../components/page-details-header";

export const QuestionaryRespond: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const questionnaire = (location.state as { questionnaire: QuestionnaireList })?.questionnaire;

    const { register } = useForm();

    const [startDateTime, setStartDateTime] = useState<string>("");
    const [solvedQuestionList, setSolvedQuestionList] = useState<
        {
            questionId: number;
            selectedAlternativeId: number;
            startDateTime: string;
            endDateTime: string;
        }[]
    >([]);

    useEffect(() => {
        if (!questionnaire) {
            navigate("/questionary")
            return;
        }
        setStartDateTime(new Date().toISOString());
    }, [questionnaire, navigate]);

    const handleAnswerSelected = (questionIndex: number, selectedAlternativeId: number) => {
        const question = questionnaire.questionList[questionIndex];
        const now = new Date().toISOString();

        setSolvedQuestionList((prev) => {
            const existing = prev.find((q) => q.questionId === question.id);
            if (!existing) {
                return [
                    ...prev,
                    {
                        questionId: question.id,
                        selectedAlternativeId,
                        startDateTime: now,
                        endDateTime: now,
                    },
                ];
            }
            return prev.map((q) =>
                q.questionId === question.id
                    ? { ...q, selectedAlternativeId, endDateTime: now }
                    : q
            );
        });
    };

    const handleSubmit = () => {
        const submissionEnd = new Date().toISOString();

        const payload = {
            questionnaireId: questionnaire.id,
            startDateTime,
            endDateTime: submissionEnd,
            studentMainEmail: questionnaire.student.mainEmail,
            solvedQuestionList,
        };

        console.log("📤 Enviando questionário:", payload);
    };

    if (!questionnaire) return null;

    return (
        <PageLayout title="Responder Questionário">
            <Box>
              <PagesDetailsHeader title="Responder Questionário"/>
                {questionnaire.questionList.map((question, index) => (
                    <Question
                        key={question.id}
                        question={question}
                        index={index}
                        register={register}
                        wasSubmitted={false}
                        selectedAnswer={undefined}
                        onAnswerSelected={handleAnswerSelected}
                    />
                ))}

                <Button variant="contained" onClick={handleSubmit}>
                    Enviar Respostas
                </Button>
            </Box>
        </PageLayout>
    );
};
