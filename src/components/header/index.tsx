import { FC, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import { Box, Divider, IconButton, Stack, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { MenuBox } from './styles'
import { isCollapsedAtom } from '../../contexts/is-sidebar-collapsed'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

type HeaderMenuProps = {
	projectAbbreviation: string
	projectName: string
	rightComponents?: ReactNode[]
	sidebar?: boolean
}

const Header: FC<HeaderMenuProps> = ({ projectAbbreviation, rightComponents, projectName, sidebar }) => {
	const theme = useTheme()
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)
	const handleCollapse = () => setIsCollapsed((collapsed) => !collapsed)

	return (
		<MenuBox>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Stack direction="row" alignItems="center" gap={2} sx={{ paddingLeft: 1 }}>
					{sidebar && (
						<Tooltip title={isCollapsed ? 'Abrir Barra Lateral' : 'Colapsar Barra Lateral'} placement="right">
							<IconButton edge="start" color="inherit" onClick={handleCollapse}>
								{isCollapsed ? <ChevronRight /> : <ChevronLeft />}
							</IconButton>
						</Tooltip>
					)}
					<Typography
						color={theme.palette.juicy.neutral.c10}
						fontSize={(theme) => theme.spacing(3)}
						fontWeight={FONT_WEIGHTS.light}
					>
						<span style={{ color: theme.palette.juicy.primary.c60 }}>
							{projectAbbreviation.slice(0, 5)}
						</span>
						{projectAbbreviation.slice(5)}
					</Typography>
					<Divider
						flexItem
						orientation="vertical"
						variant="middle"
						sx={(theme) => ({ borderColor: theme.palette.juicy.neutral.c10 })}
					/>

					<Typography
						component="span"
						sx={{
							fontWeight: FONT_WEIGHTS.extralight,
							color: theme.palette.juicy.neutral.c10,
							fontSize: theme.spacing(2.25),

						}}
					>
						{' '}
						{projectName}
					</Typography>

				</Stack>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					{rightComponents?.map((component, index) => <Box key={index}>{component}</Box>)}
				</Box>
			</Toolbar>
		</MenuBox>
	)
}

export default Header
