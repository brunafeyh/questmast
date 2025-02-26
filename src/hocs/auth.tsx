import { FC, FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthorizationRole } from '../types/person-register'
import { useAuth } from '../hooks/use-auth'
import ErrorPage from '../pages/error'

export const withAuthentication = <P extends object>(Component: FunctionComponent<P>, roles: AuthorizationRole[]): FC<P> => {
    const WrappedComponent: FC<P> = (props) => {
        const { hasSomeRole, logout, isAccessTokenExpired, accessToken, isAuthenticated } = useAuth()
        const navigate = useNavigate()
        const hasRequiredRoles = hasSomeRole(roles)

        useEffect(() => {
            const checkTokenExpiration = async () => {
                if (isAccessTokenExpired() || !isAuthenticated()) {
                    await logout()
                    navigate('/login')
                    return
                }
            }
            checkTokenExpiration()

        }, [logout, navigate, accessToken])


        if (!hasRequiredRoles) {
            return <ErrorPage code={401} title="Ops! Você não possui autorização para navegar nessa página" />
        }

        return (
            <>
                {isAuthenticated() && <Component {...props} />}
            </>
        )
    }

    WrappedComponent.displayName = `WithAuthentication(${Component.displayName || Component.name})`

    return WrappedComponent
}
