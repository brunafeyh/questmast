import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessService from '../../services/selection-process';
import { DeleteSelectionProcessForm, SelectionProcess } from '../../types/selection-process';

const service = new SelectionProcessService();

export const useSelectionProcessMutations = () => {
    const queryClient = useQueryClient()

    const createSelectionProcess = useMutation({
        mutationFn: async (form: SelectionProcess) => {
            return service.addSeletionProcess(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-process'] });
            toast.success('Processo Seletivo criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Processo Seletivo:', error);
            toast.error('Erro ao criar Processo Seletivo.');
        },
    })

    const updateSelectionProcess = useMutation({
        mutationFn: async ({ form, id }: { form: SelectionProcess, id: number }) => {
            return service.updateSeletionProcess(form, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-process'] });
            toast.success('Processo Seletivo atualizado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Processo Seletivo:', error);
            toast.error('Erro ao atualizar Processo Seletivo.');
        },
    })

    const updateSelectionProcessStatus = useMutation({
        mutationFn: async ({ id, selectionProcessStatusId }: { id: number, selectionProcessStatusId: number }) => {
            return service.updateStatus(id, selectionProcessStatusId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-process'] });
            toast.success('Status atualizado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar status do Processo Seletivo:', error);
            toast.error('Erro ao atualizar Status do  Processo Seletivo.');
        },
    })


    const deleteSelectionProcess = useMutation({
        mutationFn: async (form: DeleteSelectionProcessForm) => {
            return service.deleteSeletionProcess(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['selection-processes'] });
            toast.success('Processo Seletivo deletado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao deletar Processo Seletivo:', error);
            toast.error('Erro ao deletar Processo Seletivo.');
        },
    })

    return {
        createSelectionProcess,
        deleteSelectionProcess,
        updateSelectionProcess,
        updateSelectionProcessStatus
    }
}
