import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import BoardExaminerService from '../services/board-examiner'
import { BoardExaminer } from '../types/border-examiner'

const service = new BoardExaminerService()

export const useBoardExaminer = () => {
    const { data: boardExaminers, isLoading, error, refetch } = useQuery<BoardExaminer[]>({
        queryKey: ['boardExaminers'],
        queryFn: async () => {
            try {
                return await service.getAllBoardExaminer();
            } catch (error) {
                toast.error('Erro ao carregar as Bancas: ' + error);
                throw error;
            }
        },
    })

    return { boardExaminers, isLoading, error, refetch }
}
