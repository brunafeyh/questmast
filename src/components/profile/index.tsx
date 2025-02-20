import { FC } from 'react'
import { Logout } from '@carbon/icons-react'
import { faker } from '@faker-js/faker'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

const Profile: FC = () => {
	const navigate = useNavigate()
	const theme = useTheme()

	const user = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: faker.person.jobTitle(),
	}

	const handleLogout = async () => navigate('/login')

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
				{user.name}
			</Typography>
			<Typography
				fontSize={theme.spacing(1.5)}
				fontWeight={FONT_WEIGHTS.regular}
				color={theme.palette.juicy.neutral.c70}
				mb={theme.spacing(1)}
			>
				{user.email}
			</Typography>
			<Typography
				fontSize={theme.spacing(1.5)}
				fontWeight={FONT_WEIGHTS.medium}
				color={theme.palette.juicy.neutral.c80}
			>
				{user.role}
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
