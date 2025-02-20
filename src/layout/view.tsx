import { FC, ReactNode } from 'react'
import { useMediaQuery } from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { useAtom } from 'jotai'
import { isCollapsedAtom } from '../contexts/is-sidebar-collapsed'
import { getMarginLeft } from '../utils/layout'

interface Props extends GridProps {
	children: ReactNode
}

const ViewContainer: FC<Props> = ({ children, ...attrs }) => {
	const [isCollapsed] = useAtom(isCollapsedAtom)
	const theme = useTheme()
	const isLargeScreen = useMediaQuery('(min-width: 1273px)')
	const marginLeft = getMarginLeft(isCollapsed, isLargeScreen, theme)

	return (
		<Grid
			columnSpacing={4}
			rowGap={2}
			paddingTop={theme.spacing(11)}
			paddingBottom={8}
			marginLeft={marginLeft}
			marginRight={theme.spacing(10)}
			paddingRight={theme.spacing(37)}
			component="main"
			sx={{
				minWidth: '100%',
			  }}
			{...attrs}
		>
			{children}
		</Grid>
	)
}

export default ViewContainer
