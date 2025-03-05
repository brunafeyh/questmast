import { FC } from 'react'
import { Logout } from '@carbon/icons-react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'
import { useAuth } from '../../hooks/use-auth'
import { formatRole } from '../../utils/forma-role'

const Profile: FC = () => {
	const theme = useTheme()
	const { user, logout } = useAuth()
	const handleLogout = () => logout()

	return (
		<Box
			p={2}
			sx={{
				minWidth: theme.spacing(25),
				width: 'auto',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Typography
				fontSize={theme.spacing(1.75)}
				fontWeight={FONT_WEIGHTS.medium}
				color={theme.palette.juicy.neutral.c100}
				mb={theme.spacing(1)}
			>
				{user?.name}
			</Typography>
			<Typography
				fontSize={theme.spacing(1.5)}
				fontWeight={FONT_WEIGHTS.regular}
				color={theme.palette.juicy.neutral.c70}
				mb={theme.spacing(1)}
			>
				{user?.email}
			</Typography>
			<Typography
				fontSize={theme.spacing(1.5)}
				fontWeight={FONT_WEIGHTS.medium}
				color={theme.palette.juicy.neutral.c80}
			>
				{formatRole(user?.role)}
			</Typography>
			<Button
				sx={{
					mt: theme.spacing(2),
					boxShadow: 'none',
					width: '100%',
				}}
				variant="text"
				startIcon={<Logout />}
				onClick={handleLogout}
			>
				Sair
			</Button>
		</Box>
	)
}

export default Profile