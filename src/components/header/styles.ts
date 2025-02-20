import { Box, BoxProps, styled } from '@mui/material'

export const MenuBox = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.juicy.neutral.c100,
	color: theme.palette.juicy.neutral.c10,
	position: 'fixed',
	top: theme.spacing(0),
	left: theme.spacing(0),
	right: theme.spacing(0),
	height: theme.spacing(8),
}))
