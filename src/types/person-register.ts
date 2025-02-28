import { z } from "zod";
import { AdressSchema } from "./adress";
import { phoneSchema } from "./phone"

export const cpfSchema = z.object({
    cpf: z.string()
})

export const genderSchema = z.object({
    acronym: z.string(),
    description: z.string()
})

export const roleSchema = z.enum(['ROLE_STUDENT', 'ROLE_ADMIN', 'ROLE_CONTENT_MODERATOR'])

export type AuthorizationRole = z.infer<typeof roleSchema>

export const personalDataSchema = z.object({
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    personRole: roleSchema,
    cpf: z.string().min(1, "CPF é obrigatório"),
    genderAcronym: z.string().min(1, "Gênero é obrigatório"),
    name: z.string().min(1, "Nome é obrigatório"),
    birthDate: z.string().min(1, "Data de Nascimento é obrigatória"),
    mainEmail: z.string().email().min(1, "Email é obrigatório"),
    phoneList: z.array(phoneSchema).min(1, "É necessário cadastrar pelo menos um telefone"),
});

export type PersonalDataType = z.infer<typeof personalDataSchema>

export const addressSchema = z.object({
    specificAddressFormDTO: AdressSchema,
})

export type AddressType = z.infer<typeof addressSchema>

export const personRegisterSchema = personalDataSchema.merge(addressSchema)
export type PersonRegisterType = z.infer<typeof personRegisterSchema>

export const validationSchemas = [personalDataSchema, personRegisterSchema];