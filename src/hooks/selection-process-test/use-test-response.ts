import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SolvedSelectionProcessTestService from '../../services/solved-selection-process-test'
import { SolvedTestResponse } from '../../types/solved-tests-response'

const service = new SolvedSelectionProcessTestService()

export const useTestResponseById = (id: number, email: string) => {
    const { data: selectionProcessTestResponse, isLoading, error, refetch } = useQuery<SolvedTestResponse>({
        queryKey: ['test', id],
        queryFn: async () => {
            try {
                return await service.getresolvedSeletionProcessTest(id, email);
            } catch (error) {
                toast.error('Erro ao carregar o retorno da Prova: ' + error);
                throw error;
            }
        },
    })

    return { selectionProcessTestResponse, isLoading, error, refetch }
}
