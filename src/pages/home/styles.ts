import { Tab as TabMui, Tabs as TabsMui, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

export const Tab = styled(TabMui)(({ theme }) => ({
	textTransform: 'none',
	color: theme.palette.juicy.neutral.c70,
	fontWeight: FONT_WEIGHTS.light,
	'&.Mui-selected': {
		color: theme.palette.juicy.primary.c60,
		fontWeight: FONT_WEIGHTS.medium,
	},
}))

export const Tabs = styled(TabsMui)(({ theme }) => ({
	'& .MuiTabs-indicator': {
		backgroundColor: theme.palette.juicy.primary.c60,
	},
	width: '100%',
	borderBottom: `1px solid ${theme.palette.juicy.neutral.c30}`,
	'& .Mui-selected': {
		borderBottom: `1px solid ${theme.palette.juicy.primary.c60}`,
	},
}))
