import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import DDIAddressService from '../../services/ddi'
import { DDIList } from '../../types/phone'

const service = new DDIAddressService()

export const useDDI = () => {
    const { data: ddis, isLoading, error, refetch } = useQuery<DDIList[]>({
        queryKey: ['ddis'],
        queryFn: async () => {
            try {
                return await service.fetchDDI();
            } catch (error) {
                toast.error('Erro ao carregar os DDI: ' + error);
                throw error;
            }
        },
    })

    return { ddis, isLoading, error, refetch }
}
