import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SelectionProcessService from '../../services/selection-process'
import { SelectionProcessList } from '../../types/selection-process'

const service = new SelectionProcessService()

export const useSelectionProcessesById = (id: number) => {
  const { data: selectionProcess, isLoading, error, refetch } = useQuery<SelectionProcessList>({
    queryKey: ['selection-process', id],
    queryFn: async () => {
      try {
        return await service.getSeletionProcess(id)
      } catch (error: any) {
        toast.error('Erro ao carregar o Processo Seletivo: ' + error.message)
        throw error
      }
    },
  })

  return { selectionProcess, isLoading, error, refetch }
}
