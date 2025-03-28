import { FC, ReactNode } from 'react'
import Grid, { GridProps } from '@mui/material/Grid'

interface Props extends GridProps {
	children: ReactNode
}

const ErrorContainer: FC<Props> = ({ children, ...attrs }) => {
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			columnSpacing={4}
			rowGap={2}
			paddingLeft={55}
			paddingBottom={8}
			component="main"
			columns={{ xl: 12, lg: 12, md: 8, sm: 4, xs: 4 }}
			{...attrs}
		>
			{children}
		</Grid>
	)
}

export default ErrorContainer
