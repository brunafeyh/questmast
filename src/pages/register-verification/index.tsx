import { FC } from 'react'
import { Checkmark } from '@carbon/icons-react'
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { FONT_WEIGHTS } from '../../utils/constants/theme'
import Header from '../../components/header'
import { Modal, useModal } from '../../components/modal'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { useAuth } from '../../hooks/use-auth'
import Loading from '../../components/loading'
import VerificationContainer from '../../layout/verification'

const VerificationPage: FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const { data } = useParams<{ data: string }>()

    const { verifyEmailMutation } = useAuth()
    if (!data) return <p>Parâmetros inválidos</p>
    const [email, code] = data.split(':')
    const modal = useModal()
    const handleOpenModal = () => modal.current?.openModal()
    const handleCloseModal = () => modal.current?.openModal()

    const handleConfirm = () => {
        verifyEmailMutation.mutate({ email, verificationEmailCode: code })
    }

    if (verifyEmailMutation.isPending) return <Loading />
    return (
        <VerificationContainer paddingLeft={75}>
            <Paper sx={{
                padding: 3,
                '@media screen and (min-width: 1800px)': {
                    ml: 10
                }
            }}>
                <Header
                    projectAbbreviation="QuestMast"
                    projectName='Sistema de Preparação de Processos Seletivos' />
                <Stack
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        color={theme.palette.juicy.primary.c60}
                        fontWeight={FONT_WEIGHTS.bold}
                        marginBottom={theme.spacing(1)}
                        fontSize={theme.spacing(3.5)}
                    >
                        Verificação de Email
                    </Typography>
                    <Typography
                        color={theme.palette.juicy.neutral.c70}
                        fontWeight={FONT_WEIGHTS.regular}
                        marginBottom={theme.spacing(2)}
                        fontSize={theme.spacing(2)}
                    >
                        Para validar o seu email clique no botão abaixo:
                    </Typography>
                    <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'} gap={2}>
                        <Button variant="outlined" onClick={handleOpenModal} fullWidth>
                            Cancelar
                        </Button>
                        <Button startIcon={<Checkmark />} variant="contained" onClick={handleConfirm} fullWidth>
                            Confirmar
                        </Button>
                    </Box>
                </Stack>
            </Paper>

            <Modal ref={modal}>
                <ConfirmationModal text='Tem certeza? Sem confirmação não há como entrar no sistema!' onCancel={handleCloseModal} onConfirm={() => navigate('/login')} />
            </Modal>
        </VerificationContainer>
    )
}

export default VerificationPage
