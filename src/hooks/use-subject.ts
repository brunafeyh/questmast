import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SubjectService from '../services/subject'
import { Subject } from '../types/subject'

const service = new SubjectService()

export const useSubjects = () => {
    const { data: subjects, isLoading, error, refetch } = useQuery<Subject[]>({
        queryKey: ['subjects'],
        queryFn: async () => {
            try {
                return await service.getSubjects();
            } catch (error) {
                toast.error('Erro ao carregar as Disciplinas: ' + error);
                throw error;
            }
        },
    })

    return { subjects, isLoading, error, refetch }
}
