import { createTheme } from '@mui/material'
import { JUICY_COLORS } from './colors'
import { fonts } from './fonts'
import { FONT_WEIGHTS, IBM_PLEX_SANS_FONT_FAMILY } from '../utils/constants/theme'

export const theme = createTheme({
	palette: {
		juicy: { ...JUICY_COLORS },
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 416,
			md: 912,
			lg: 1280,
			xl: 1280,
		},
	},

	typography: {
		fontFamily: [IBM_PLEX_SANS_FONT_FAMILY, IBM_PLEX_SANS_FONT_FAMILY].join(','),
		h3: undefined,
		h4: undefined,
		h5: undefined,
		h6: undefined,
		subtitle1: undefined,
		subtitle2: undefined,
		allVariants: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			color: JUICY_COLORS.primary.c100,
			fontSize: '1rem',
		},
		h1: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '2rem',
			'@media screen and (max-width: 416px)': {
				fontSize: '1.5rem',
			},
		},
		h2: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '1.5rem',
			'@media screen and (max-width: 416px)': {
				fontSize: 16,
			},
		},
		button: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body1: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body2: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: Object.values(fonts).join('\n'),
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'initial',
					fontSize: '12px',
					fontWeight: FONT_WEIGHTS.medium,
					padding: '8px 16px',
					color: `${JUICY_COLORS.neutral.c10}`,
					backgroundColor: `${JUICY_COLORS.primary.c60}`,
					transition: 'all .2s',
					borderRadius: 0,
					border: 'none',
					boxShadow: '4px 4px 4px rbga(0, 0, 0, 0.2) !important',
					height: '32px',
					'&:focus, &:active': {
						border: 'none',
						outline: 'none',
					},
					'& svg': {
						width: '1.5rem',

						height: '1.5rem',
					},
				},
			},
			variants: [
				{
					props: { disabled: true },
					style: {
						background: 'none',
						opacity: '.5',
						color: `${JUICY_COLORS.primary.c60} !important`,
						'& :is(p, span, strong, svg)': {
							fill: JUICY_COLORS.primary.c60,
						},
					},
				},
				{
					props: { variant: 'outlined' },
					style: {
						color: `${JUICY_COLORS.neutral.c100}`,
						backgroundColor: 'transparent',
						border: `1px solid ${JUICY_COLORS.neutral.c50}`,
						'&:hover': {
							backgroundColor: `${JUICY_COLORS.neutral.c40}`,
							border: `1px solid ${JUICY_COLORS.neutral.c50}`,
						},
					},
				},

				{
					props: { variant: 'text' },
					style: {
						color: `${JUICY_COLORS.primary.c60}`,
						backgroundColor: 'transparent',
						'&:hover': {
							backgroundColor: `${JUICY_COLORS.neutral.c10}`,
						},
					},
				},
			],
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%',
					color: JUICY_COLORS.primary?.c100,

					'& .MuiFilledInput-root': {
						backgroundColor: JUICY_COLORS.neutral.c20,
						'&:hover': {
							backgroundColor: JUICY_COLORS.neutral.c30,
						},
						'&.Mui-focused': {
							backgroundColor: JUICY_COLORS.neutral.c30,
						},
					},
					'& .MuiFilledInput-underline:before': {
						borderBottomColor: JUICY_COLORS.neutral.c60,
					},
					'& .MuiFilledInput-underline:after': {
						borderBottomColor: JUICY_COLORS.primary.c60,
					},
					'& .MuiFormLabel-root': {
						color: JUICY_COLORS.neutral.c70,
					},
				},
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					'&:focus, &:active': {
						border: 'none',
						outline: 'none',
					},
					border: 'none',
				},
			},
			variants: [
				{
					props: { disabled: true },
					style: {
						background: 'none',
						opacity: '.5',
						color: `${JUICY_COLORS.neutral.c60} !important`,
						'& :is(p, span, strong, svg)': {
							fill: JUICY_COLORS.neutral.c60,
						},
					},
				},
			],
		},
		MuiSnackbar: {
			styleOverrides: {
				root: {
					width: '100%',
					color: JUICY_COLORS.neutral.c10,
					'& svg': {
						color: JUICY_COLORS.neutral.c10,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					'&.Mui-selected': {
						backgroundColor: JUICY_COLORS.neutral.c40,
						color: JUICY_COLORS.neutral.c100,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: JUICY_COLORS.neutral.c60,
					},
				},
				input: {
					padding: '10px 14px',
				},
				notchedOutline: {
					borderColor: JUICY_COLORS.neutral.c50,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					padding: '8px 16px',
					fontSize: 16,
					'&:hover': {
						backgroundColor: JUICY_COLORS.neutral.c20,
					},
					'&.Mui-selected': {
						backgroundColor: JUICY_COLORS.neutral.c30,
						color: JUICY_COLORS.primary.c60,
						fontWeight: 500,
					},
					'&.Mui-selected:hover': {
						backgroundColor: JUICY_COLORS.neutral.c30,
					},
					'&.Mui-focusVisible': {
						outline: `2px solid ${JUICY_COLORS.primary.c60}`,
						outlineOffset: '-2px',
					},
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					color: JUICY_COLORS.neutral.c40,
					fontWeight: FONT_WEIGHTS.extralight,
					fontSize: 14,
					height: 48,
					width: 251,
					'&:focus, &:active': {
						border: 'none',
						outline: 'none',
					},
					gap: '16px',
					border: 'none',
					paddingLeft: 24,
					textTransform: 'none',
					'@media (min-width: 0px) and (max-width: 2900px)': {
						width: 251,
					},
					'&.Mui-selected': {
						backgroundColor: JUICY_COLORS.neutral.c80,
						color: JUICY_COLORS.primary.c50,
						borderLeft: `4px solid ${JUICY_COLORS.primary.c50}`,
						fontWeight: FONT_WEIGHTS.medium,
						paddingLeft: 20,
						'@media (min-width: 1500px) and (max-width: 2900px)': {
							width: 251,
						},
						'&:hover': {
							backgroundColor: JUICY_COLORS.neutral.c90,
						},
					},
					'&:hover': {
						backgroundColor: JUICY_COLORS.neutral.c80,
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					'& .MuiTab-root': {
						'&:focus, &:active': {
							outline: 'none',
							border: 'none',
						},
					},
				},
			},
		},
	},
})
