import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import QuestionnaryService from '../services/questionnary';
import { QuestionnaireForm } from '../types/questionnaire';

const service = new QuestionnaryService();

export const useQuestionnaryMutations = () => {
    const queryClient = useQueryClient()

    const createQuestionnary = useMutation({
        mutationFn: async (form: QuestionnaireForm) => {
            return service.createQuestionnary(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-processes'] });
            toast.success('Questionário criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Questionário:', error);
            toast.error('Erro ao criar Questionário.');
        },
    })
    const createQuestionnaryIa = useMutation({
        mutationFn: async (form: QuestionnaireForm) => {
            return service.createQuestionnaryIA(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-processes'] });
            toast.success('Questionário criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Questionário:', error);
            toast.error('Erro ao criar Questionário.');
        },
    })

    return {
        createQuestionnary,
        createQuestionnaryIa
    }
}
