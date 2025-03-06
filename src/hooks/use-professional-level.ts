import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ProfessionalLevel } from '../types/professional-level'
import ProfessionalLevelService from '../services/professional-level'

const service = new ProfessionalLevelService()

export const useProfessionalLevel = () => {
    const { data: professionalLevel, isLoading, error, refetch } = useQuery<ProfessionalLevel[]>({
        queryKey: ['professionalLevel'],
        queryFn: async () => {
            try {
                return await service.fetchProfessionalLevel();
            } catch (error) {
                toast.error('Erro ao carregar os Níveis Profissionais: ' + error);
                throw error;
            }
        },
    })

    return { professionalLevel, isLoading, error, refetch }
}
