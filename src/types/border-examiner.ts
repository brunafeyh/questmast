import { z } from "zod";
import { cnpjSchema } from "./institution";

export const boardExaminerSchema = z.object({
    id: z.number(),
    name: z.string(),
    cnpj: cnpjSchema,
    quantityOfTests: z.number(),
    quantityOfQuestions: z.number(),
    quantityOfSelectionProcess: z.number()
})

export type BoardExaminer = z.infer<typeof boardExaminerSchema>