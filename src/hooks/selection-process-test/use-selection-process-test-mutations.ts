import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { TestFormData } from '../../types/test';
import SelectionProcessTestService from '../../services/selection-process-test';

const service = new SelectionProcessTestService();

export const useSelectionProcessTestMutations = () => {
    const queryClient = useQueryClient()

    const createSelectionProcessTest = useMutation({
        mutationFn: async (form: TestFormData) => {
            return service.addSeletionProcessTest(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova criada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Prova:', error);
            toast.error('Erro ao criar Prova.');
        },
    })

    const updateSelectionProcessTest = useMutation({
        mutationFn: async ({ form, id }: { form: TestFormData, id: number }) => {
            return service.updateSeletionProcessTest(form, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Prova:', error);
            toast.error('Erro ao atualizar Prova.');
        },
    })

    const deleteSelectionProcessTest = useMutation({
        mutationFn: async ({ id, email }: { id: number, email: string }) => {
            return service.deleteSeletionProcessTestById(id, email);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova deletada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao deletar Prova:', error);
            toast.error('Erro ao deletar Prova.');
        },
    })

    return {
        createSelectionProcessTest,
        deleteSelectionProcessTest,
        updateSelectionProcessTest
    }
}
