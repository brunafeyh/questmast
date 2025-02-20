import { FC } from 'react'
import { Return } from '@carbon/icons-react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorContainer from '../../layout/error'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

type Props = {
	code: number
	title: string
}

const ErrorPage: FC<Props> = ({ code, title }) => {
	const navigate = useNavigate()
	const theme = useTheme()
	return (
		<ErrorContainer>
			<Stack
				sx={{
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					color={theme.palette.juicy.primary.c60}
					fontWeight={FONT_WEIGHTS.bold}
					marginBottom={theme.spacing(1)}
					fontSize={theme.spacing(8)}
				>
					{code}
				</Typography>
				<Typography
					color={theme.palette.juicy.neutral.c100}
					fontWeight={FONT_WEIGHTS.bold}
					marginBottom={theme.spacing(1)}
					fontSize={theme.spacing(3)}
				>
					{title}
				</Typography>
				<Typography
					color={theme.palette.juicy.neutral.c70}
					fontWeight={FONT_WEIGHTS.regular}
					marginBottom={theme.spacing(2)}
					fontSize={theme.spacing(2)}
				>
					Você está tentando acessar uma página ou recurso que não existe ou que você não tem acesso!
				</Typography>
				<Button startIcon={<Return />} variant="text" onClick={() => navigate('/')}>
					Voltar à Página Inicial
				</Button>
			</Stack>
		</ErrorContainer>
	)
}

export default ErrorPage
