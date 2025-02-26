import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ExternAddressService from '../services/extern-address';
import { ExternAddress } from '../types/extern-address';

const service = new ExternAddressService();

export const useExternAddressByCep = (cep: string, options: { enabled?: boolean } = {}) => {
  const { data: adress, isLoading, error, refetch } = useQuery<ExternAddress>({
    queryKey: ['extern-address', cep],
    queryFn: async () => {
      try {
        return await service.fetchExternAddress(cep);
      } catch (error) {
        toast.error('Erro ao carregar o endereço: ' + error);
        throw error;
      }
    },
    enabled: options.enabled ?? false,
  });

  return { adress, isLoading, error, refetch };
};
