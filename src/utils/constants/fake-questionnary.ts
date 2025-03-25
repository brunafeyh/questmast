import { QuestionnaireList } from "../../types/questionarry-list";

export const fakeQuestionnaire: QuestionnaireList = {
    id: 1,
    name: "Simulado de História",
    viewCounter: 10,
    isPublic: true,
    student: {
        id: 1,
        name: "João da Silva",
        specificAddress: {
            number: "123",
            complement: "Apto 45",
            address: {
                id: 1,
                cep: "12345-678",
                street: {
                    id: 1,
                    name: "Av. Brasil",
                    streetType: {
                        acronym: "Av",
                        name: "Avenida",
                    },
                },
                neighborhood: {
                    id: 1,
                    name: "Centro",
                },
                city: {
                    id: 1,
                    name: "São Paulo",
                    federateUnit: {
                        acronym: "SP",
                        name: "São Paulo",
                    },
                },
            },
        },
        phoneList: [
            {
                number: "987654321",
                ddd: { ddd: 11 },
                ddi: { ddi: 55 },
            },
        ],
        mainEmail: "joao@email.com",
        recoveryEmail: "joao.backup@email.com",
        cpf: { cpf: "12345678900" },
        gender: {
            acronym: "M",
            description: "Masculino",
        },
        birthDate: "2000-01-01T00:00:00.000Z",
    },
    questionList: [
        {
            id: 1,
            applicationDate: "2025-03-25",
            isGeneratedByAi: true,
            name: "Capital do Brasil",
            statementImageUrl: "https://exemplo.com/imagem.jpg",
            statementImageLegend: "Mapa do Brasil",
            statement: "Qual é a capital do Brasil?",
            quantityOfCorrectAnswers: 10,
            quantityOfWrongAnswers: 5,
            quantityOfTries: 15,
            explanation: "Brasília é a capital do Brasil desde 1960.",
            videoExplanationUrl: "https://youtube.com/video-explicativo",
            questionAlternativeList: [
                { id: 1, statement: "Rio de Janeiro", isCorrect: false },
                { id: 2, statement: "São Paulo", isCorrect: false },
                { id: 3, statement: "Brasília", isCorrect: true },
                { id: 4, statement: "Salvador", isCorrect: false },
            ],
            questionDifficultyLevel: {
                id: 1,
                name: "Fácil",
                description: "Nível introdutório",
            },
            subject: {
                id: 1,
                name: "Geografia",
                description: "Estudo dos espaços geográficos",
            },
            subjectTopicList: [
                {
                    id: 1,
                    name: "Capitais",
                    description: "Cidades que são capitais de estados ou países",
                    subject: {
                        id: 1,
                        name: "Geografia",
                        description: "Estudo dos espaços geográficos",
                    },
                },
            ],
        },
    ],
};
