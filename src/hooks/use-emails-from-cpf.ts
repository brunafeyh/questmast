import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import AuthService from '../services/auth';
import { UserEmails } from '../types/user-emails';

const service = new AuthService();

export const useUserEmailsfromCPF = (cpf: string, enabled: boolean) => {
    const { data, isLoading, error, refetch } = useQuery<UserEmails>({
        queryKey: ['emails', cpf],
        queryFn: async () => {
            try {
                return await service.getEmailfromCPF(cpf);
            } catch (error) {
                toast.error('Erro ao carregar emails: ' + error);
                throw error;
            }
        },
        enabled,
    })

    return { data, isLoading, error, refetch }
}
