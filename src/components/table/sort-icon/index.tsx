import { FC } from 'react'
import { ArrowDown, ArrowUp, ArrowsVertical } from '@carbon/icons-react'
import { Direction } from '../../../types/filter'
import { ascDirection, descDirection } from '../../../utils/filter'
import { JUICY_COLORS } from '../../../themes/colors'

type SortIconProps = {
	sortState: Direction | false
}

const SortIcon: FC<SortIconProps> = ({ sortState }) => {
	if (ascDirection(sortState)) return <ArrowDown style={{ width: 16, height: 16, color: JUICY_COLORS.primary.c60 }} />
	if (descDirection(sortState)) return <ArrowUp style={{ width: 16, height: 16, color: JUICY_COLORS.primary.c60 }} />
	return <ArrowsVertical style={{ width: 16, height: 16 }} />
}

export default SortIcon
