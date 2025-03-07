export interface Test {
    id: number;
    name: string;
    viewCounter: number;
    questionList: Question[];
    applicationDate: string;
    function: TestFunction;
    professionalLevel: ProfessionalLevel;
}

export interface Question {
    id: number;
    applicationDate: string;
    name: string;
    statementImageUrl: string;
    statement: string;
    quantityOfCorrectAnswers: number;
    quantityOfWrongAnswers: number;
    quantityOfTries: number;
    explanation: string;
    videoExplanationUrl: string;
    questionAlternativeList: QuestionAlternative[];
    questionDifficultyLevel: QuestionDifficultyLevel;
    subject: Subject;
    subjectTopicList: SubjectTopic[];
}

export interface QuestionAlternative {
    id: number;
    statement: string;
    isCorrect: boolean;
}

export interface QuestionDifficultyLevel {
    id: number;
    name: string;
    description: string;
}

export interface Subject {
    id: number;
    name: string;
    description: string;
}

export interface SubjectTopic {
    id: number;
    name: string;
    description: string;
    subject: Subject;
}

export interface TestFunction {
    id: number;
    name: string;
    description: string;
}

export interface ProfessionalLevel {
    id: number;
    name: string;
    description: string;
}
