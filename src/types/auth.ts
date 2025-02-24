import { z } from "zod";

export type AuthorizationRole = 'ROLE_ADMINISTRATOR' | 'ROLE_CUSTOMER' | 'ROLE_ATTENDANT';

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

export const credentialsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório').regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  mainEmail: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem coincidir',
  path: ['confirmPassword'],
});
export type RegisterCredentials = z.output<typeof credentialsSchema>

export const credentialsAuthSchema = z.object({
	mainEmail: z
		.string()
		.nonempty('Username ou email é obrigatório')
		.regex(/^(?:[a-z]+|[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,})$/i, 'Deve ser um nome de usuário ou email válidos'),
	password: z.string().nonempty('Senha é obrigatória'),
})

export type AuthCredentials = z.output<typeof credentialsAuthSchema>
