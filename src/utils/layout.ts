import { Theme } from '@mui/material'

export const getMarginLeft = (isCollapsed: boolean, isLargeScreen: boolean, theme: Theme) => {
	const sidebarWidthCollapsed = theme.spacing(12)
	const sidebarWidthExpanded = theme.spacing(35)

	const marginLeft = isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded

	if (isLargeScreen && !isCollapsed) return `calc(${marginLeft})`

	return marginLeft
}
