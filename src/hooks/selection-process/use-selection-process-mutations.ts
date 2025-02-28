import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessService from '../../services/selection-process';
import { SelectionProcess } from '../../types/selection-process';

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

    return {
        createSelectionProcess
    }
}
