import { z } from "zod";
import { AuthorizationRole } from "./person-register";

export interface User {
  name: string;
  email: string;
  cpf: string
  role: AuthorizationRole;
}

export interface AccessToken {
  exp: number;
  name?: string;
  email?: string;
  cpf?: string;
  role: AuthorizationRole;
}

export const credentialsAuthSchema = z.object({
	mainEmail: z
		.string()
		.nonempty('Username ou email é obrigatório')
		.regex(/^(?:[a-z]+|[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,})$/i, 'Deve ser um nome de usuário ou email válidos'),
	password: z.string().nonempty('Senha é obrigatória'),
})

export type AuthCredentials = z.output<typeof credentialsAuthSchema>
