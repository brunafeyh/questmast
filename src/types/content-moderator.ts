import { z } from "zod";
import { cpfSchema, genderSchema } from "./person-register";

export const contentModeratorSchema = z.object({
    id: z.number(),
    name: z.string(),
    mainEmail: z.string(),
    recoveryEmail: z.string(),
    cpf: cpfSchema,
    gender: genderSchema,
    birthDate: z.string()
  })
  
  export type contentModerator = z.infer<typeof contentModeratorSchema>;
  