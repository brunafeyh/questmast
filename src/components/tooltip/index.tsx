import { FC, ReactElement } from 'react'

import Tooltip from '@mui/material/Tooltip'

export type TooltipPlacement =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'left'
  | 'left-end'
  | 'left-start'
  | 'right'
  | 'right-end'
  | 'right-start'
  | 'top'
  | 'top-end'
  | 'top-start'

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
