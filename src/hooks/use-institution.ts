import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import InstitutionService from '../services/institution'
import { Institution } from '../types/institution'

const service = new InstitutionService()

export const useInstitution = () => {
    const { data: institutions, isLoading, error, refetch } = useQuery<Institution[]>({
        queryKey: ['institutions'],
        queryFn: async () => {
            try {
                return await service.getAllInstitutions();
            } catch (error) {
                toast.error('Erro ao carregar as Institições: ' + error);
                throw error;
            }
        },
    })

    return { institutions, isLoading, error, refetch }
}
