import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import QuestionDifficultyService from '../services/question-difficulty'
import { Questiondifficulty } from '../types/questions-difficulty'

const service = new QuestionDifficultyService()

export const useQuestionDifficulty = () => {
    const { data: questionDifficulty, isLoading, error, refetch } = useQuery<Questiondifficulty[]>({
        queryKey: ['question-difficulty'],
        queryFn: async () => {
            try {
                return await service.fetchQuestionDifficulty();
            } catch (error) {
                toast.error('Erro ao carregar os Níveis de Dificuldade: ' + error);
                throw error;
            }
        },
    })

    return { questionDifficulty, isLoading, error, refetch }
}
