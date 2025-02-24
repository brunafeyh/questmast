import { z } from "zod";
import { AdressSchema } from "./adress";
import { phoneSchema } from "./phone";

export const roleSchema = z.enum(['ROLE_STUDENT', 'ROLE_ADMIN', 'ROLE_CONTENT_MODERATOR'])

export const personRegisterSchema = z.object({
    password: z.string(),
    personRole: roleSchema,
    cpf: z.string(),
    genderAcronym: z.string(),
    name: z.string(),
    birthDate: z.string(),
    specificAddressFormDTO: AdressSchema,
    mainEmail: z.string(),
    phoneList: z.array(phoneSchema)

})

export type PersonRegisterType = z.infer<typeof personRegisterSchema>