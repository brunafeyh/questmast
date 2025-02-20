import { FC, ReactNode } from 'react'
import { ArrowLeft } from '@carbon/icons-react'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { JUICY_COLORS } from '../../themes/colors'
import { FONT_WEIGHTS } from '../../utils/constants/theme'


type DetailsPagesHeaderProps = {
	title: string
	rightSideComponent?: ReactNode[]
}

const DetailsPagesHeader: FC<DetailsPagesHeaderProps> = ({ title, rightSideComponent }) => {
	const theme = useTheme()
	const navigate = useNavigate()
	const handleBack = () => navigate(-1)
	return (
		<Stack
			width={'100%'}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			mr={theme.spacing(0)}
			mt={theme.spacing(0)}
			mb={theme.spacing(3)}
		>
			<Box display="flex" alignItems="center">
				<IconButton onClick={handleBack} color="inherit">
					<ArrowLeft color={JUICY_COLORS.neutral.c100} />
				</IconButton>
				<Typography fontSize={theme.spacing(2.5)} pl={theme.spacing(1)} fontWeight={FONT_WEIGHTS.light}>
					{title}
				</Typography>
			</Box>
			<Stack direction="row" spacing={1}>
				{rightSideComponent?.map((component, index) => <Box key={index}>{component}</Box>)}
			</Stack>
		</Stack>
	)
}

export default DetailsPagesHeader
