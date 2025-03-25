import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PerformanceService from '../services/performance'
import { Stats } from '../types/stats'

const service = new PerformanceService()

export const usePerformance = (email: string) => {
    const { data: performance, isLoading, error, refetch } = useQuery<Stats>({
        queryKey: ['performance'],
        queryFn: async () => {
            try {
                return await service.getPerformance(email);
            } catch (error) {
                toast.error('Erro ao carregar o Desempenho do Estudante: ' + error);
                throw error;
            }
        },
    })

    return { performance, isLoading, error, refetch }
}
