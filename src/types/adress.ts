import { z } from "zod";

export const AdressSchema = z.object({
    number: z.string(),
    complement: z.string(),
    cep: z.string(),
    street: z.string(),
    streetType: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    federalUnit: z.string()
})

export type AdressTyoe = z.infer<typeof AdressSchema>