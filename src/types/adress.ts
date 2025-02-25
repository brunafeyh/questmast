import { z } from "zod";

export const AdressSchema = z.object({
    number: z.string().min(1, "O número da Casa é obrigatório"),
    complement: z.string().min(1, "O complemento é obrigatório"),
    cep: z.string().min(1, "O CEP é obrigatório"),
    street: z.string().min(1, "O Logradouro é obrigatório"),
    streetType: z.string().min(1, "O Tipo de Logradouro é obrigatório"),
    neighborhood: z.string().min(1, "O Bairro é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    federalUnit: z.string().min(1, "O Estado é obrigatório"),
})

export type AdressTyoe = z.infer<typeof AdressSchema>