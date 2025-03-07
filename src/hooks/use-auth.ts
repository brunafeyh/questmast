import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { RESET } from 'jotai/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { AuthorizationRole, PersonRegisterType } from '../types/person-register'
import { AuthCredentials } from '../types/auth'
import { accessTokenAtom, refreshTokenAtom } from '../contexts/auth'
import { getExpirationTime, getUserFromToken } from '../utils/auth'
import AuthService from '../services/auth'
import { UpdatePasswordVerificationForm } from '../types/verify'

const authService = new AuthService()

export const useAuth = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const navigate = useNavigate();
  const user = useMemo(() => getUserFromToken(accessToken), [accessToken]);
  const expirationTime = getExpirationTime(accessToken);

  const updateTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  const loginMutation = useMutation<string, Error, AuthCredentials>({
    mutationFn: async (credentials: AuthCredentials) => {
      const token = await authService.login(credentials);
      const response = token.toString();
      updateTokens(response, response);
      return response;
    },
    onSuccess: () => {
      toast.success('Login successful!');
      navigate('/')
    },
    onError: (error) => {
      toast.error('Error logging in. Please check your credentials.');
      console.error('Error logging in:', error);
    },
  })

  const registerMutation = useMutation<boolean, Error, PersonRegisterType>({
    mutationFn: async (credentials: PersonRegisterType) => {
      await authService.register(credentials);
      return true;
    },
    onSuccess: () => {
      toast.success('Registration successful!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error('Error registering user. Please check your details.');
      console.error('Error registering user:', error);
    },
  })


  const verifyEmailMutation = useMutation<void, Error, { email: string; verificationEmailCode: string }>({
    mutationFn: async ({ email, verificationEmailCode }) => {
      await authService.verifyEmail({ email, verificationEmailCode });
    },
    onSuccess: () => {
      toast.success('Verificação de Email feita com sucesso!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error('Erro ao Verificar Email de usuário');
      console.error('Erro ao validar email:', error);
    },
  })

  const updatePasswordMutation = useMutation({
    mutationFn: async (form: UpdatePasswordVerificationForm) => {
      await authService.updatePassword(form);
    },
    onSuccess: () => {
      toast.success('Mudança de senha feita com sucesso!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error('Erro na mudança de senha!');
      console.error('Erro na mudança de senha!:', error);
    },
  })

  const getEmailsMutation = useMutation({
    mutationFn: async (cpf: string) => {
      const result = await authService.getEmailfromCPF(cpf)
      return result
    },
    onError: (error) => {
      toast.error('Erro listar Emails de usuário');
      console.error('Erro listar emails de usário:', error);
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await authService.changePassword(email);
    },
    onSuccess: () => {
      toast.success('Link de mudança de senha enviado por email!');
      setTimeout(() => {
        navigate('/login');
      }, 15000);
    },
    onError: (error) => {
      toast.error('Erro ao solicitar mudança de senha!');
      console.error('Erro ao solicitar mudança de senha:', error);
    },
  });

  const logout = useCallback(async () => {
    try {
      setAccessToken(RESET);
      setRefreshToken(RESET);
      delete axios.defaults.headers.common['Authorization'];
      toast.info('Logged out successfully.');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out.');
      console.error('Error logging out:', error);
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  const hasSomeRole = useCallback(
    (requiredRoles: AuthorizationRole[]) => {
      return user ? requiredRoles.includes(user.role) : false;
    },
    [user]
  )

  const isAccessTokenExpired = useCallback(() => {
    return Date.now() > expirationTime
  }, [expirationTime])

  const isAuthenticated = useCallback(() => {
    return accessToken && !isAccessTokenExpired()
  }, [accessToken, isAccessTokenExpired])

  const isStudante = user?.role === 'ROLE_STUDENT'
  const isModerator = user?.role === 'ROLE_CONTENT_MODERATOR'

  return {
    token: accessToken,
    accessToken,
    refreshToken,
    user,
    loginMutation,
    registerMutation,
    logout,
    isAuthenticated,
    hasSomeRole,
    isAccessTokenExpired,
    verifyEmailMutation,
    getEmailsMutation,
    changePasswordMutation,
    updatePasswordMutation,
    isStudante,
    isModerator
  }
}
