export type QuestionReturnIaAlternative = {
    id: number | null;
    statement: string;
    isCorrect: boolean | null;
};

export type QuestionReturnIa = {
    id: number | null;
    name: string;
    statementImage: string | null;
    statement: string;
    explanation: string;
    videoExplanationUrl: string | null;
    questionAlternativeList: QuestionReturnIaAlternative[];
}
