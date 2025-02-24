
export const formatSeelectionProcessTitle = (value: string) => {
    if (value === 'open-registration') return 'Inscrições Abertas'
    else if (value === 'in-progress') return 'Previstos'
    else return 'Todos'
}
