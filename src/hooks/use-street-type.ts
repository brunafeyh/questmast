import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import StreetTypeService from '../services/use-street-type'
import { StreetType } from '../types/adress'

const service = new StreetTypeService()

export const useStreetType= () => {
    const { data: streetType, isLoading, error } = useQuery<StreetType[]>({
        queryKey: ['street-types'],
        queryFn: async () => {
            try {
                return await service.fetchStreetType();
            } catch (error) {
                toast.error('Erro ao carregar os Tipo de Logradouros: ' + error);
                throw error;
            }
        },
    })

    return { streetType, isLoading, error }
}
