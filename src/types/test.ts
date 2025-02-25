export type Option = { text: string };

export type QuestionType = {
    id: string;
    prompt: string;
    options: Option[];
};

export type ExamType = {
    id: string;
    name: string;
    position: string;
    questions: QuestionType[];
};

export type FormValues = {
    title: string;
    institution: string;
    year: number;
    status: string;
    examBoard: string;
    exams: ExamType[];
};
