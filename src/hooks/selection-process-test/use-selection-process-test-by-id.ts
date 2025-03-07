import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Test } from '../../types/test-list'
import SelectionProcessTestService from '../../services/selection-process-test'

const service = new SelectionProcessTestService()

export const useSelectionProcessesTestById = (id: number) => {
    const { data: selectionProcessTest, isLoading, error, refetch } = useQuery<Test>({
        queryKey: ['selection-process-test', id],
        queryFn: async () => {
            try {
                return await service.getSeletionProcessTestById(id);
            } catch (error) {
                toast.error('Erro ao carregar a Prova: ' + error);
                throw error;
            }
        },
    })

    return { selectionProcessTest, isLoading, error, refetch }
}
