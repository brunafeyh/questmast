export function getStatusColor(status: string) {
	switch (status) {
		case 'Aberto':
			return {
				label: 'Aberto',

				sx: {
					backgroundColor: '#f7f7f2',
					color: '#b3a104',
				},
			}
		case 'Concluído':
			return {
				label: 'Concluído',
				color: 'success',
				sx: {
					backgroundColor: '#effdef',
					color: '#32a44f',
				},
			}
		case 'Cancelado':
			return {
				label: 'Cancelado',
				color: '#d93848',
				sx: {
					backgroundColor: '#feeef0',
					color: '#d93848',
				},
			}
		case 'Inactive':
			return {
				label: 'Inactive',
				color: 'default',
				sx: {
					backgroundColor: '#f2f2f2',
					color: '#909090',
				},
			}
		default:
			return {
				label: status,
				color: 'default',
				sx: {},
			}
	}
}