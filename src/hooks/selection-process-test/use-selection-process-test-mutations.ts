import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { TestFormData } from '../../types/test';
import SelectionProcessTestService from '../../services/selection-process-test';
import SolvedSelectionProcessTestService from '../../services/solved-selection-process-test';
import { SolvedSelectionProcessTest } from '../../types/solved-selection-process-test';
import TestIaService from '../../services/read-ia';

const service = new SelectionProcessTestService()

const serviceIA = new TestIaService()

const serviceResponde = new SolvedSelectionProcessTestService();

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

    const createSelectionProcessTestIA = useMutation({
        mutationFn: async (file: File) => {
            return serviceIA.getQuestionsWithIa(file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova lida com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao ler Prova:', error);
            toast.error('Erro ao ler Prova.');
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

    const respondSelectionProcessTest = useMutation({
        mutationFn: async (form: SolvedSelectionProcessTest) => {
            return serviceResponde.resolveSeletionProcessTest(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test'] });
            toast.success('Prova respondida com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao responder Prova:', error);
            toast.error('Erro ao responder Prova.');
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
        updateSelectionProcessTest,
        respondSelectionProcessTest,
        createSelectionProcessTestIA
    }
}
