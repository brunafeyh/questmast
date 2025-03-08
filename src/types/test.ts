import { z } from "zod"

export const questionAlternativeSchema = z.object({
    id: z.number().optional(),
    statement: z.string().min(1, "O enunciado é obrigatório"),
    isCorrect: z.boolean(),
})

export const questionSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "O nome da questão é obrigatório"),
    statementImage: z.string().optional(),
    statement: z.string().min(1, "O enunciado é obrigatório"),
    explanation: z.string().optional(),
    videoExplanationUrl: z.string().optional(),
    questionAlternativeList: z.array(questionAlternativeSchema).min(1, "A questão deve ter pelo menos uma alternativa"),
    questionDifficultyLevelId: z.number().min(1, "Selecione um nível de dificuldade"),
    subjectId: z.number().min(1, "Selecione uma matéria"),
    subjectTopicList: z.array(z.number()).optional(),
})

export const testSchema = z.object({
    applicationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data inválida",
    }),
    name: z.string().min(1, "O nome da prova é obrigatório"),
    functionId: z.number().min(1, "O ID da função é obrigatório"),
    professionalLevelId: z.number().min(1, "O nível profissional é obrigatório"),
    selectionProcessId: z.number().min(1, "O ID do processo seletivo é obrigatório"),
    contentModeratorEmail: z.string().email("E-mail inválido"),
    questionList: z.array(questionSchema).min(1, "A prova deve ter pelo menos uma questão"),
})

export type TestFormData = z.infer<typeof testSchema>;
