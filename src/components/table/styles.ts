import {
	TableHead as MuiTableHead,
	TablePagination as MuiTablePagination,
	TableCell,
	TableCellProps,
	TableHeadProps,
	TablePaginationProps,
	TableRow,
	TableRowProps,
	Typography,
	TypographyProps,
	styled,
	TextField as TextFieldMui
} from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'


export const TableRowHead = styled(TableRow)<TableRowProps>(({ theme }) => ({
	height: theme.spacing(6),
}))

export const TableHead = styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
	backgroundColor: theme.palette.juicy.neutral.c30,
	wordBreak: 'break-word',
	whiteSpace: 'normal',
	minWidth: theme.spacing(18.75),
	maxWidth: theme.spacing(31.25),
}))

export const TableCellHead = styled(TableCell)<TableCellProps>(({ theme }) => ({
	fontWeight: FONT_WEIGHTS.medium,
	color: theme.palette.juicy.neutral.c100,
	wordBreak: 'break-word',
	whiteSpace: 'normal',
	fontSize: theme.spacing(1.5),
	minWidth: theme.spacing(18.75),
	maxWidth: theme.spacing(31.25),
}))

export const TableRowBody = styled(TableRow)<TableRowProps>(({ theme }) => ({
	height: theme.spacing(6),
}))

export const TableCellBody = styled(TableCell)(({ theme }) => ({
	fontSize: theme.spacing(1.5),
	width: '15%',
	fontWeight: FONT_WEIGHTS.regular,
}))

export const EmptyTableTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontSize: theme.spacing(2),
	fontWeight: FONT_WEIGHTS.medium,
}))

export const TablePagination = styled(MuiTablePagination)<TablePaginationProps>(({ theme }) => ({
	borderTop: 'none',
	borderBottom: 'none',
	backgroundColor: 'transparent',
	padding: theme.spacing(0),
	justifyContent: 'flex-end',
	display: 'flex',
}))
export const TextField = styled(TextFieldMui)(({ theme }) => ({
	'& .MuiFilledInput-root': {
		backgroundColor: theme.palette.juicy.neutral.c20,
		'&:hover': {
			backgroundColor: theme.palette.juicy.neutral.c30,
		},
		'&.Mui-focused': {
			backgroundColor: theme.palette.juicy.neutral.c30,
		},
	},
	'& .MuiFilledInput-underline:before': {
		borderBottomColor: theme.palette.juicy.neutral.c60,
	},
	'& .MuiFilledInput-underline:after': {
		borderBottomColor: theme.palette.juicy.primary.c60,
	},
	'& .MuiFormLabel-root': {
		color: theme.palette.juicy.neutral.c70,
	},
}))
