import { Backdrop as BackdropMui, CircularProgress as CircularProgressMui, styled } from '@mui/material'

export const Backdrop = styled(BackdropMui)(({ theme }) => ({
	backgroundColor: theme.palette.juicy.neutral.c30,
}))

export const CircularProgress = styled(CircularProgressMui)(({ theme }) => ({
	color: theme.palette.juicy.primary.c60,
}))
