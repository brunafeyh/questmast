import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import DDDAddressService from '../../services/ddd'
import { DDDList } from '../../types/phone'

const service = new DDDAddressService()

export const useDDD = () => {
    const { data: ddds, isLoading, error, refetch } = useQuery<DDDList[]>({
        queryKey: ['ddds'],
        queryFn: async () => {
            try {
                return await service.fetchDDD();
            } catch (error) {
                toast.error('Erro ao carregar os DDD: ' + error);
                throw error;
            }
        },
    })

    return { ddds, isLoading, error, refetch }
}
