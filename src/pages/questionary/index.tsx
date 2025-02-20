import { FC } from 'react'
import { Typography } from '@mui/material'
import { PageLayout } from '../../layout'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

const Questionary: FC = () => {
	return (
		<PageLayout title="Questionary">
			<Typography fontSize={(theme) =>theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.medium}>
				Questionário
			</Typography>
		</PageLayout>
	)
}

export default Questionary
