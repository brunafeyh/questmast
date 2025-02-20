import { FC, ReactNode } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

type PagesHeaderProps = {
	title: string
	rightSideComponent?: ReactNode
}

const PagesHeader: FC<PagesHeaderProps> = ({ title, rightSideComponent }) => {
	const theme = useTheme()
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
			<Typography fontSize={theme.spacing(2.5)} pl={theme.spacing(0)} fontWeight={FONT_WEIGHTS.medium}>
				{title}
			</Typography>
			<Box>{rightSideComponent}</Box>
		</Stack>
	)
}

export default PagesHeader
