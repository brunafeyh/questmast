import { jwtDecode } from 'jwt-decode'
import { AccessToken, User } from '../types/auth'
import { useAuth } from '../hooks/use-auth'
import { AuthorizationRole } from '../types/person-register'

interface DecodedToken {
	exp: number
}

export const decodeToken = (token: string) => jwtDecode<AccessToken>(token)

export const getUserFromToken = (token?: string | null): User | null => {
	if (!token) return null

	const decodedToken = decodeToken(token)
	
	const user: User = {
		cpf: decodedToken.cpf ? decodedToken.cpf : 'Unknown',
		email: decodedToken.email ?? 'Unknown',
		name: decodedToken.name ?? 'Unknown',
		role: decodedToken.role
	}

	return user
}

export const getExpirationTime = (token: string | null): number => {
	if (!token) {
		return 0
	}
	const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)
	return decodedToken.exp * 1000
}

export const roles: AuthorizationRole[] = ['ROLE_ADMIN', 'ROLE_CONTENT_MODERATOR', 'ROLE_STUDENT'];

export const adminRoles: AuthorizationRole[] = ['ROLE_ADMIN', 'ROLE_CONTENT_MODERATOR'];

export function getCpf(): string {
	const { user } = useAuth();
	if (user && user.cpf) {
		return user.cpf
	}
	return ''
}