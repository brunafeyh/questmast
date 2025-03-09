import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Grid,
    Typography,
    Paper,
} from "@mui/material";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";
import { Question } from "../../question";
import { Question as QuestionType } from "../../../types/test-list";
type FormData = {
    responses: number[];
};

const fictitiousQuestions: QuestionType[] = [
    {
        id: 1,
        applicationDate: "2024-01-01",
        name: "Sample Exam",
        statementImageUrl: "",
        statementImageLegend: "",
        statement:
            "Which of the following characteristics best defines a worm virus?",
        quantityOfCorrectAnswers: 0,
        quantityOfWrongAnswers: 0,
        quantityOfTries: 0,
        explanation:
            "A worm virus can self-replicate and spread without user interaction.",
        videoExplanationUrl: "",
        questionAlternativeList: [
            { id: 1, statement: "It replicates without needing a host", isCorrect: true },
            { id: 2, statement: "It requires manual execution", isCorrect: false },
            { id: 3, statement: "It cannot replicate", isCorrect: false },
            { id: 4, statement: "It is undetectable by antivirus", isCorrect: false },
        ],
        questionDifficultyLevel: {
            id: 1,
            name: "Hard",
            description: "Challenging question",
        },
        subject: {
            id: 1,
            name: "Computer Science",
            description: "Study of computers",
        },
        subjectTopicList: [
            {
                id: 1,
                name: "Malware",
                description: "Malicious software",
                subject: {
                    id: 1,
                    name: "Computer Science",
                    description: "Study of computers",
                },
            },
        ],
    },
    {
        id: 2,
        applicationDate: "2024-01-01",
        name: "Sample Exam",
        statementImageUrl: "",
        statementImageLegend: "",
        statement:
            "Which alternative best describes a security vulnerability?",
        quantityOfCorrectAnswers: 0,
        quantityOfWrongAnswers: 0,
        quantityOfTries: 0,
        explanation:
            "A security vulnerability is a flaw that can be exploited by attackers.",
        videoExplanationUrl: "",
        questionAlternativeList: [
            { id: 5, statement: "Option A", isCorrect: false },
            { id: 6, statement: "Option B", isCorrect: false },
            { id: 7, statement: "Option C", isCorrect: true },
            { id: 8, statement: "Option D", isCorrect: false },
        ],
        questionDifficultyLevel: {
            id: 2,
            name: "Medium",
            description: "Moderately challenging question",
        },
        subject: {
            id: 2,
            name: "Information Technology",
            description: "Study of IT systems",
        },
        subjectTopicList: [
            {
                id: 2,
                name: "Cybersecurity",
                description: "Security in IT systems",
                subject: {
                    id: 2,
                    name: "Information Technology",
                    description: "Study of IT systems",
                },
            },
        ],
    },
];

export default function QuestionnaireForm() {
    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: { responses: Array(fictitiousQuestions.length).fill(-1) },
    });
    const [loading, setLoading] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const responses = watch("responses");

    const onSubmit = (data: FormData) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setWasSubmitted(true);
            console.log("Submitted responses:", data.responses);
        }, 1000);
    };

    return (
        <Paper elevation={0} sx={{ width: "100%", p: 2 }}>
            {!loading && (
                <>
                    <Typography fontWeight={FONT_WEIGHTS.regular} sx={{ mb: 3 }}>
                        Answer the following questions:
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {fictitiousQuestions.map((question, index) => (
                            <Question
                                key={question.id}
                                question={question}
                                index={index}
                                register={register}
                                selectedAnswer={responses[index]}
                                wasSubmitted={wasSubmitted}
                            />
                        ))}

                        <Grid container spacing={2} justifyContent="flex-end" mt={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" disabled={wasSubmitted}>
                                    Submit Answers
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}

            {wasSubmitted && !loading && (
                <Box sx={{ mt: 4 }}>
                    <Typography fontWeight={FONT_WEIGHTS.regular}>Result:</Typography>
                    <Typography fontWeight={FONT_WEIGHTS.light}>
                        You answered{" "}
                        {
                            responses.filter(
                                (response, i) =>
                                    response ===
                                    fictitiousQuestions[i].questionAlternativeList.findIndex(
                                        (alt) => alt.isCorrect
                                    )
                            ).length
                        }{" "}
                        out of {fictitiousQuestions.length} questions correctly.
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
