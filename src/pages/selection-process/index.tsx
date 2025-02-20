import { FC } from 'react'
import { Typography } from '@mui/material'
import { PageLayout } from '../../layout'
import { FONT_WEIGHTS } from '../../utils/constants/theme'
import { useLocation } from 'react-router-dom'

const inscricoesabertas = [
    { title: 'Cell text 1', institution: 'Institution A', year: '2023', state: 'State A', status: 'Open' },
    { title: 'Cell text 2', institution: 'Institution B', year: '2022', state: 'State B', status: 'Due' },
    { title: 'Cell text 3', institution: 'Institution C', year: '2021', state: 'State C', status: 'Inactive' },
    { title: 'Cell text 4', institution: 'Institution D', year: '2023', state: 'State D', status: 'Paid' },
]


const previstos = [
    { title: 'Cell text X', institution: 'Institution X', year: '2023', state: 'State X', status: 'Open' },
    { title: 'Cell text Y', institution: 'Institution Y', year: '2022', state: 'State Y', status: 'Due' },
    { title: 'Cell text Z', institution: 'Institution Z', year: '2021', state: 'State Z', status: 'Inactive' },
    { title: 'Cell text W', institution: 'Institution W', year: '2023', state: 'State W', status: 'Paid' },
]

const todos = [
    { title: 'Cell text 1', institution: 'Institution A', year: '2023', state: 'State A', status: 'Open' },
    { title: 'Cell text 2', institution: 'Institution B', year: '2022', state: 'State B', status: 'Due' },
    { title: 'Cell text 3', institution: 'Institution C', year: '2021', state: 'State C', status: 'Inactive' },
    { title: 'Cell text 4', institution: 'Institution D', year: '2023', state: 'State D', status: 'Paid' },
    { title: 'Cell text X', institution: 'Institution X', year: '2023', state: 'State X', status: 'Open' },
    { title: 'Cell text Y', institution: 'Institution Y', year: '2022', state: 'State Y', status: 'Due' },
    { title: 'Cell text Z', institution: 'Institution Z', year: '2021', state: 'State Z', status: 'Inactive' },
    { title: 'Cell text W', institution: 'Institution W', year: '2023', state: 'State W', status: 'Paid' },
]

const formatTitle = (value: string) => {
    if (value === 'open-registration') return 'Inscrições Abertas'
    else if (value === 'in-progress') return 'Previstos'
    else return 'Todos'
}


const SelectionProcess: FC = () => {
    const { pathname } = useLocation()
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    let selectedData
    console.log(lastSegment)

    if (lastSegment === 'open-registration') {
        selectedData = inscricoesabertas
    }
    if (lastSegment === 'in-progress') {
        selectedData = previstos
    }
    if (lastSegment === 'all') {
        selectedData = todos
    }
    return (
        <PageLayout title="Processos Seletivos">
            <Typography fontSize={(theme) => theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.medium}>
                Processo Seletivos {formatTitle(lastSegment)}
            </Typography>
        </PageLayout>
    )
}

export default SelectionProcess
