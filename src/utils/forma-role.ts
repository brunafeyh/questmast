import { AuthorizationRole } from "../types/person-register";

export const formatRole = (role: AuthorizationRole | undefined) => {
    if (!role) return '-'
    if (role === 'ROLE_ADMIN') return 'ADMINISTRADOR'
    if (role === 'ROLE_CONTENT_MODERATOR') return 'MODERADOR DE CONTEÚDO'
    return 'ESTUDANTE'
}