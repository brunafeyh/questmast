import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CityService from '../services/citys';
import { CityDTO } from '../types/selection-process';

const service = new CityService();

export const useCityByUF = (
    uf: string,
    options?: Omit<UseQueryOptions<CityDTO[], Error>, 'queryKey' | 'queryFn'>
) => {
    const { data: cityes, isLoading, error, refetch } = useQuery<CityDTO[]>({
        queryKey: ['cityes', uf],
        queryFn: async () => {
            try {
                return await service.getAllCityesfromUF(uf);
            } catch (error) {
                toast.error('Erro ao carregar o endereço: ' + error);
                throw error;
            }
        },
        ...options,
    })

    return { cityes, isLoading, error, refetch };
}
