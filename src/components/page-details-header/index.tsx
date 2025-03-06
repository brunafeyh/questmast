import { FC, ReactNode } from 'react'
import { Box, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { FONT_WEIGHTS } from '../../utils/constants/theme'
import { ArrowLeft } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'

type PagesHeaderProps = {
    title: string
    status?: string,
    rightSideComponents?: ReactNode[]
}

const PagesDetailsHeader: FC<PagesHeaderProps> = ({ title, rightSideComponents, status }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <Stack
            width={1223}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={theme.spacing(3)}
        >
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </IconButton>
                <Typography
                    fontSize={theme.spacing(2)}
                    fontWeight={FONT_WEIGHTS.light}
                    ml={2}
                >
                    {title}
                </Typography>
                {status && (<Chip label={status} sx={{ ml: 2 }} />)}
            </Box>
            <Box>
                {rightSideComponents && (
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        {rightSideComponents.map((component, index) => (
                            <Box key={index}>{component}</Box>
                        ))}
                    </Stack>
                )}
            </Box>
        </Stack>
    )
}

export default PagesDetailsHeader
