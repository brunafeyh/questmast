
export const formatSelectionProcessTitle = (value: string) => {
    if (value === 'open-registration') return 'Processos Seletivos com Inscrições Abertas'
    else if (value === 'in-progress') return 'Processos Seletivos Previstos'
    else return 'Todos os Processos Seletivos'
}