import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import FunctionService from '../services/function'
import { Function } from '../types/function'

const service = new FunctionService()

export const useFunctions = () => {
    const { data: functions, isLoading, error, refetch } = useQuery<Function[]>({
        queryKey: ['function'],
        queryFn: async () => {
            try {
                return await service.fetchFunctions();
            } catch (error) {
                toast.error('Erro ao carregar os Cargos: ' + error);
                throw error;
            }
        },
    })

    return { functions, isLoading, error, refetch }
}
