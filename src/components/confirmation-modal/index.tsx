import { FC } from 'react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

type ConfirmationModalProps = {
	text: string,
	header?: string
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ text, onConfirm, onCancel, header }) => {
	const theme = useTheme()
	return (
		<Box flexDirection={'column'}>
			<Typography
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: theme.spacing(2),
				}}
				fontWeight={FONT_WEIGHTS.light}
				fontSize={24}
			>
				<WarningAmberIcon color="warning" fontSize="large" />
				{header || 'Confirmação de Exclusão'}
			</Typography>
			<Typography fontSize={18} sx={{ mt: 2 }}>
				{text}
			</Typography>
			<Box display={'flex'} justifyContent={'space-between'} gap={2} mt={3}>
				<Button fullWidth onClick={onCancel} variant="outlined">
					Cancelar
				</Button>
				<Button fullWidth onClick={onConfirm} variant="contained" color="error">
					Excluir
				</Button>
			</Box>
		</Box>
	)
}
