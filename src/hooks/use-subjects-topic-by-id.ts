import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import SubjectTopicService from '../services/subject-topic'
import { SubjectTopic } from '../types/subject-topic'

const service = new SubjectTopicService()

export const useSubjectTopicsById = (id: number, options: { enabled?: boolean }) => {
    const { data: subjectsTopics, isLoading, error, refetch } = useQuery<SubjectTopic[]>({
        queryKey: ['subject-topic'],
        queryFn: async () => {
            try {
                return await service.getSubjectTopics(id)
            } catch (error) {
                toast.error('Erro ao carregar os Subtópicos da Disciplina: ' + error);
                throw error;
            }
        },
        enabled: options.enabled ?? false,
    })

    return { subjectsTopics, isLoading, error, refetch }
}
