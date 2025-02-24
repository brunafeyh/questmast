import { FC, JSX, useState } from 'react'
import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { Box, Collapse, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'
import ConditionalTooltip from '../tooltip'
import { isCollapsedAtom } from '../../contexts/is-sidebar-collapsed'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

type SidebarItem = {
	text: string
	icon?: JSX.Element
	route?: string
	children?: SidebarItem[]
}

type SidebarProps = {
	menuItems: SidebarItem[]
}

const Sidebar: FC<SidebarProps> = ({ menuItems }) => {
	const theme = useTheme()
	const [isCollapsed] = useAtom(isCollapsedAtom)
	const navigate = useNavigate()
	const location = useLocation()
	const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({})

	const toggleSubmenu = (text: string) => {
		setOpenSubmenus((prev) => ({
			...prev,
			[text]: !prev[text],
		}))
	}

	const isParentActive = (children?: SidebarItem[]) => {
		return children?.some((child) => location.pathname.startsWith(child.route || ''))
	}

	return (
		<Stack
			sx={{
				position: 'fixed',
				top: theme.spacing(8),
				left: theme.spacing(0),
				width: isCollapsed ? theme.spacing(8.5) : theme.spacing(31.375),
				height: '100vh',
				backgroundColor: theme.palette.juicy.neutral.c90,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transition: 'width 0.3s ease-in-out',
				boxShadow: 'none',
				zIndex: theme.zIndex.drawer - 1,
			}}
		>
			<Box sx={{ flexGrow: 1, width: '100%' }}>
				<Box sx={{ marginTop: theme.spacing(3), width: '100%' }}>
					<ToggleButtonGroup
						orientation="vertical"
						value={location.pathname}
						exclusive
						sx={{ width: isCollapsed ? theme.spacing(8) : theme.spacing(23) }}
					>
						{menuItems.map((item) => {
							const isActive = location.pathname === item.route || isParentActive(item.children)
							const shouldExpand = openSubmenus[item.text] || isParentActive(item.children)

							return (
								<Box key={item.text} sx={{ width: '100%' }}>
									<ConditionalTooltip title={item.text} placement="top-start" value={isCollapsed}>
										<ToggleButton
											value={item.route || item.text}
											onClick={() =>
												item.children ? toggleSubmenu(item.text) : navigate(item.route!)
											}
											sx={{
												justifyContent: 'flex-start',
												width: '100%',
												fontWeight: isActive ? 'bold' : 'light',
											}}
										>
											{item.icon}
											{isCollapsed ? null : item.text}
											{item.children && (
												<Box
													sx={{
														marginLeft: isCollapsed
															? theme.spacing(-1.5)
															: theme.spacing(2),
													}}
												>
													{shouldExpand ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
												</Box>
											)}
										</ToggleButton>
									</ConditionalTooltip>
									{item.children && (
										<Collapse in={shouldExpand} unmountOnExit>
											<ToggleButtonGroup
												orientation="vertical"
												value={location.pathname}
												exclusive
												sx={{ width: '100%' }}
											>
												{item.children.map((child) => (
													<ToggleButton
														key={child.text}
														value={child.route || child.text}
														onClick={() => navigate(child.route!)}
														sx={{
															justifyContent: 'flex-start', width: '100%'
															, fontWeight: 'light',
														}}
													>
														<Typography
															fontSize={
																isCollapsed ? theme.spacing(1.15) : theme.spacing(1.65)
															}
															color={theme.palette.juicy.neutral.c40}
															sx={{
																pl: isCollapsed ? theme.spacing(0) : theme.spacing(4.5),
																fontWeight: FONT_WEIGHTS.light
															}}
														>
															{' '}
															{child.icon} {child.text}
														</Typography>
													</ToggleButton>
												))}
											</ToggleButtonGroup>
										</Collapse>
									)}
								</Box>
							)
						})}
					</ToggleButtonGroup>
				</Box>
			</Box>
		</Stack>
	)
}

export default Sidebar
