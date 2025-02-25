import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { RESET } from 'jotai/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationRole, PersonRegisterType } from '../types/person-register';
import { AuthCredentials } from '../types/auth';
import { accessTokenAtom, refreshTokenAtom } from '../contexts/auth';
import { getExpirationTime, getUserFromToken } from '../utils/auth'
import AuthService from '../services/auth';

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
  };

  const login = useCallback(async (credentials: AuthCredentials) => {
    try {
      const token = authService.login(credentials)
      const response = (await token).toString()
      updateTokens(response, response);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Error logging in. Please check your credentials.');
      console.error('Error logging in:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: PersonRegisterType) => {
    try {
      await authService.register(credentials)
      toast.success('Registration successful!')
      navigate('/login')
      return true
    } catch (error) {
      toast.error('Error registering user. Please check your details.');
      console.error('Error registering user:', error);
      return false
    }
  }, [])

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
  );
  const isAccessTokenExpired = useCallback(() => {
    return Date.now() > expirationTime;
  }, [expirationTime]);
  const isAuthenticated = useCallback(() => {
    return accessToken && !isAccessTokenExpired();
  }, [accessToken]);

  return {
    token: accessToken,
    accessToken,
    refreshToken,
    user,
    login,
    register,
    logout,
    isAuthenticated,
    hasSomeRole,
  }
}
