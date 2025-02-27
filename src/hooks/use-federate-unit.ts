import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import FederateUnitService from '../services/federate-unit'
import { FederateUnit } from '../types/federate-unit'

const service = new FederateUnitService()

export const useFederateUnit = () => {
    const { data: federateUnit, isLoading, error, refetch } = useQuery<FederateUnit[]>({
        queryKey: ['federateUnit'],
        queryFn: async () => {
            try {
                return await service.getAllFederates();
            } catch (error) {
                toast.error('Erro ao carregar os Estados: ' + error);
                throw error;
            }
        },
    })

    return { federateUnit, isLoading, error, refetch }
}
