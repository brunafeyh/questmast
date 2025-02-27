import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessStatusService from '../services/status'
import { SelectionProcessStatus } from '../types/status'

const service = new SelectionProcessStatusService()

export const useStatus = () => {
    const { data: status, isLoading, error, refetch } = useQuery<SelectionProcessStatus[]>({
        queryKey: ['status'],
        queryFn: async () => {
            try {
                return await service.getAllStatus();
            } catch (error) {
                toast.error('Erro ao carregar os Status: ' + error);
                throw error;
            }
        },
    })

    return { status, isLoading, error, refetch }
}
