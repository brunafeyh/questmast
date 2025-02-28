import { FC, ReactNode } from 'react'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'
import { ArrowLeft } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'

type PagesHeaderProps = {
    title: string
    rightSideComponent?: ReactNode[]
}

const PagesDetailsHeader: FC<PagesHeaderProps> = ({ title, rightSideComponent }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <Stack
            width={'100%'}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mr={theme.spacing(0)}
            mt={theme.spacing(0)}
            mb={theme.spacing(3)}
        >
            <IconButton onClick={() => navigate(-1)}>
                <ArrowLeft />
            </IconButton>
            <Typography fontSize={theme.spacing(2)} pl={theme.spacing(1)} pr={2} fontWeight={FONT_WEIGHTS.light}>
                {title}
            </Typography>
            <Box>
                {rightSideComponent && (
                    <Stack direction="row" spacing={2} justifyContent={'flex-end'}>
                        {rightSideComponent.map((component, index) => (
                            <Box gap={2} key={index}>{component}</Box>
                        ))}
                    </Stack>
                )}
            </Box>
        </Stack>
    )
}

export default PagesDetailsHeader
