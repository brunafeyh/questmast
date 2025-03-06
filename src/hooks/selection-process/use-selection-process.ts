import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessService from '../../services/selection-process'
import { SelectionProcessList } from '../../types/selection-process'

const service = new SelectionProcessService()

export const useSelectionProcesses = () => {
    const { data: selectionProcesses, isLoading, error, refetch } = useQuery<SelectionProcessList[]>({
        queryKey: ['selection-processes'],
        queryFn: async () => {
            try {
                return await service.listSeletionProcess();
            } catch (error) {
                toast.error('Erro ao carregar os Processos Seletivos: ' + error);
                throw error;
            }
        },
    })

    return { selectionProcesses, isLoading, error, refetch }
}
