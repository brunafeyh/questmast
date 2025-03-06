import { Box, BoxProps, styled } from '@mui/material'

export const BoxModal = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: theme.spacing(50),
	minHeight: theme.spacing(25),
	backgroundColor: theme.palette.juicy.neutral.c10,
	p: theme.spacing(0.5),
	borderRadius: 4
}))
