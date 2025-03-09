import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessTestService from '../../services/selection-process-test'
import { Test } from '../../types/test-list'

const service = new SelectionProcessTestService()

export const useMoreViewedTests = () => {
    const { data: selectionProcessesTest, isLoading, error, refetch } = useQuery<Test[]>({
        queryKey: ['tests'],
        queryFn: async () => {
            try {
                return await service.getMoreViewedSeletionProcessTest();
            } catch (error) {
                toast.error('Erro ao carregar os Processos Seletivos: ' + error);
                throw error;
            }
        },
    })

    return { selectionProcessesTest, isLoading, error, refetch }
}
