import { FC, JSX, useState } from 'react'
import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { Drawer, Box, Collapse, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'
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

	const isParentActive = (children?: SidebarItem[]) =>
		children?.some((child) => location.pathname.startsWith(child.route || ''))

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: isCollapsed ? theme.spacing(8.5) : theme.spacing(31.375),
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: isCollapsed ? theme.spacing(8.5) : theme.spacing(31.375),
					boxSizing: 'border-box',
					backgroundColor: theme.palette.juicy.neutral.c90,
					top: theme.spacing(8),
				},
			}}
		>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{ marginTop: theme.spacing(3) }}>
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
											{!isCollapsed && item.text}
											{item.children && (
												<Box
													sx={{
														marginLeft: isCollapsed ? theme.spacing(-1.5) : theme.spacing(2),
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
															justifyContent: 'flex-start',
															width: '100%',
															fontWeight: 'light',
														}}
													>
														<Typography
															fontSize={
																isCollapsed ? theme.spacing(1.15) : theme.spacing(1.65)
															}
															color={theme.palette.juicy.neutral.c40}
															sx={{
																pl: isCollapsed ? theme.spacing(0) : theme.spacing(4.5),
																fontWeight: FONT_WEIGHTS.light,
															}}
														>
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
		</Drawer>
	)
}

export default Sidebar
