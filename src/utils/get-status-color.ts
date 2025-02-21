export function getStatusColor(status: string) {
	switch (status) {
	  case 'Open':
		return {
		  label: 'Open',
		  color: 'primary',
		  sx: {
			backgroundColor: '#f1f0ff',
			color: '#5f5af6',
		  },
		}
	  case 'Paid':
		return {
		  label: 'Paid',
		  color: 'success',
		  sx: {
			backgroundColor: '#effdef',
			color: '#32a44f',
		  },
		}
	  case 'Due':
		return {
		  label: 'Due',
		  color: 'error',
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