import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { AvatarIcon } from './styles'
import { generateAvatarAcronym } from '../../utils/generate-avatar-acronym'

type AvatarProfileProps = {
	name?: string
}

export const AvatarProfile: FC<AvatarProfileProps> = ({ name }) => {
	return (
		<Tooltip key="conta" title="Conta">
			<AvatarIcon>{generateAvatarAcronym(name)}</AvatarIcon>
		</Tooltip>
	)
}

export default AvatarProfile
