import { FC } from 'react'
import { Typography } from '@mui/material'
import { PageLayout } from '../../layout'
import { FONT_WEIGHTS } from '../../utils/constants/theme'

const TITLE = 'Desempenho'

const Performance: FC = () => {
    return (
        <PageLayout title={TITLE}>
            <Typography fontSize={(theme) => theme.spacing(2.5)} fontWeight={FONT_WEIGHTS.medium}>
                {TITLE}
            </Typography>
        </PageLayout>
    )
}

export default Performance
