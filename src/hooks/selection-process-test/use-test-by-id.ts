import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Test } from '../../types/test-list'
import SelectionProcessTestService from '../../services/selection-process-test'

const service = new SelectionProcessTestService()

export const useTestsById = (id: number) => {
    const { data: tests, isLoading, error, refetch } = useQuery<Test[]>({
        queryKey: ['test'],
        queryFn: async () => {
            try {
                return await service.getSeletionProcessTest(id)
            } catch (error) {
                toast.error('Erro ao carregar as Provas do Processo Seletivo: ' + error);
                throw error;
            }
        },
    })

    return { tests, isLoading, error, refetch }
}
