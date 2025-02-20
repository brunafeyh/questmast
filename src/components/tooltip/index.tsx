import { FC, ReactElement } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { TooltipPlacement } from '@/types/tooltip'

interface ConditionalTooltipProps {
	title: string
	placement?: TooltipPlacement
	value: boolean
	children: ReactElement
}

const ConditionalTooltip: FC<ConditionalTooltipProps> = ({ title, placement = 'bottom', value, children }) => {
	if (value) {
		return (
			<Tooltip title={title} placement={placement}>
				{children}
			</Tooltip>
		)
	}
	return <>{children}</>
}

export default ConditionalTooltip
