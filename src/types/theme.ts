import { CSSProperties } from 'react'
export type FontWeight = 'bold' | 'regular' | 'medium' | 'light' | 'extralight'

export interface Font {
	[k: string]: `
	@font-face {
		font-family: ${string};
		font-style: normal;
		font-display: swap;
		font-weight: ${number};
		src: local(${string}), local(${string}), url(${string}) format(${string});
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`
}

export interface JuicyColors {
	c10?: CSSProperties['color']
	c20?: CSSProperties['color']
	c30?: CSSProperties['color']
	c40?: CSSProperties['color']
	c50?: CSSProperties['color']
	c60?: CSSProperties['color']
	c70?: CSSProperties['color']
	c80?: CSSProperties['color']
	c90?: CSSProperties['color']
	c100?: CSSProperties['color']
	c110?: CSSProperties['color']
}
export interface JuicyPallete {
	primary: JuicyColors
	secondary: JuicyColors
	neutral: JuicyColors
	success: JuicyColors
	error: JuicyColors
	warning: JuicyColors
	purple: JuicyColors
	olive: JuicyColors
}

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		juicy: JuicyPallete
	}
	interface PaletteOptions {
		juicy: JuicyPallete
	}
}
