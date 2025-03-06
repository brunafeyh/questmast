import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AddTestFormData } from '../../types/test';
import SelectionProcessTestService from '../../services/selection-process-test';

const service = new SelectionProcessTestService();

export const useSelectionProcessTestMutations = () => {
    const queryClient = useQueryClient()

    const createSelectionProcessTest = useMutation({
        mutationFn: async (form: AddTestFormData) => {
            return service.addSeletionProcessTest(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova criada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Prova:', error);
            toast.error('Erro ao criarProva.');
        },
    })

    return {
        createSelectionProcessTest,
    }
}
