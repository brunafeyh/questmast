import { Avatar, AvatarProps, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'


export const AvatarIcon = styled(Avatar)<AvatarProps>(({ theme }) => ({
	background: theme.palette.juicy.primary.c10,
	color: theme.palette.juicy.primary.c60,
	alignSelf: 'center',
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.regular,
	height: theme.spacing(3.75),
	width: theme.spacing(3.75),
	borderRadius: theme.spacing(0.25),
}))
