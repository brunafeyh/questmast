import { z } from "zod"

export const cnpjSchema = z.object({
    cnpj: z.string()    
 })

export const institutionSchema = z.object({
   id: z.number(),
   name: z.string(),
   cnpj: cnpjSchema,
   siteUrl: z.string(),
   quantityOfTests: z.number(),
   quantityOfQuestions: z.number(),
   quantityOfSelectionProcess: z.number()
})

export type Institution = z.infer<typeof institutionSchema>