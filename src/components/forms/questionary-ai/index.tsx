import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { fakeQuestionnaire } from "../../../utils/constants/fake-questionnary";
import { Question } from "../../question";


export const QuestionaryRespond: React.FC = () => {
  const { register, watch } = useForm();

  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");

  const [solvedQuestionList, setSolvedQuestionList] = useState<
    {
      questionId: number;
      selectedAlternativeId: number;
      startDateTime: string;
      endDateTime: string;
    }[]
  >([]);

  useEffect(() => {
    setStartDateTime(new Date().toISOString());
  }, []);

  const handleAnswerSelected = (questionIndex: number, selectedAlternativeId: number) => {
    const question = fakeQuestionnaire.questionList[questionIndex];

    const existing = solvedQuestionList.find((q) => q.questionId === question.id);

    const now = new Date().toISOString();

    if (!existing) {
      setSolvedQuestionList((prev) => [
        ...prev,
        {
          questionId: question.id,
          selectedAlternativeId,
          startDateTime: now,
          endDateTime: now,
        },
      ]);
    } else {
      setSolvedQuestionList((prev) =>
        prev.map((q) =>
          q.questionId === question.id
            ? { ...q, selectedAlternativeId, endDateTime: now }
            : q
        )
      );
    }
  };

  const handleSubmit = () => {
    const submissionEnd = new Date().toISOString();
    setEndDateTime(submissionEnd);

    const payload = {
      questionnaireId: fakeQuestionnaire.id,
      startDateTime,
      endDateTime: submissionEnd,
      studentMainEmail: fakeQuestionnaire.student.mainEmail,
      solvedQuestionList,
    };

    console.log("📤 Enviando questionário:", payload);
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Responder Questionário
      </Typography>

      {fakeQuestionnaire.questionList.map((question, index) => (
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
  );
};
