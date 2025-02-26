import { z } from "zod";

export const phoneSchema = z.object({
    number: z.string(),
    dddNumber: z.number(),
    ddiNumber: z.number()
})

export type PhoneType = z.infer<typeof phoneSchema>

export const ddiSchemaList = z.object({
    ddi: z.number()
})

export type DDIList = z.infer<typeof ddiSchemaList>

export const dddSchemaList = z.object({
    ddd: z.number()
})

export type DDDList = z.infer<typeof dddSchemaList>