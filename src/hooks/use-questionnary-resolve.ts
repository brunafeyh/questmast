import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SolvedQuestionnaryService from '../services/solved-questionnaire';
import { QuestionRespondForm } from '../types/questionnary-respond-form';

const service = new SolvedQuestionnaryService();

export const useQuestionnaryRespondMutations = () => {
    const queryClient = useQueryClient()

    const respondQuestionnary = useMutation({
        mutationFn: async (form: QuestionRespondForm) => {
            return service.solveQuestionnary(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-processes'] });
            toast.success('Questionário respondido com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao responder questionário:', error);
            toast.error('Erro ao responder questionário.');
        },
    })

    return {
        respondQuestionnary,
    }
}
