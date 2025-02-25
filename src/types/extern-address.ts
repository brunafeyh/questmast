import { z } from "zod";

export const externAddressSchema = z.object({
    number: z.string(),
    complement: z.string(),
    cep: z.string(),
    street: z.string(),
    streetType: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    federateUnit: z.string()
})

export type ExternAddress = z.infer<typeof externAddressSchema>