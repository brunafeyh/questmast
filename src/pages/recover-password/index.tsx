import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkmark, Search } from '@carbon/icons-react';
import { Box, Button, Card, CardContent, Divider, IconButton, Radio, RadioGroup, FormControlLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorContainer from '../../layout/error';
import { FONT_WEIGHTS } from '../../utils/constants/theme';
import Header from '../../components/header';
import Loading from '../../components/loading';
import { useUserEmailsfromCPF } from '../../hooks/use-emails-from-cpf';
import { useAuth } from '../../hooks/use-auth';

type FormData = {
    cpf: string
    selectedEmail: string
}

const RecoverPasswordPage: FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const { changePasswordMutation } = useAuth()

    const [cpfValue, setCpfValue] = useState<string>('')
    const [shouldFetch, setShouldFetch] = useState<boolean>(false)
    const [selectedEmail, setSelectedEmail] = useState<string | null>(null)

    const { data, isLoading, refetch } = useUserEmailsfromCPF(cpfValue, shouldFetch);

    const handleSearchEmails = async () => {
        if (!cpfValue || cpfValue.length < 11) return
        setShouldFetch(true)
        await refetch()
    }

    const onSubmit = () => {
        if (!selectedEmail) return
        changePasswordMutation.mutate(selectedEmail)
    }

    if (isLoading || changePasswordMutation.isPending) return <Loading />

    return (
        <ErrorContainer>
            <Header
                projectAbbreviation="QuestMast"
                projectName="Sistema de Preparação de Processos Seletivos"
            />
            <Stack
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing(3),
                }}
            >
                <Typography
                    color={theme.palette.juicy.primary.c60}
                    fontWeight={FONT_WEIGHTS.bold}
                    marginBottom={theme.spacing(1)}
                    fontSize={theme.spacing(4)}
                >
                    Recuperação de Senha
                </Typography>
                <Typography
                    color={theme.palette.juicy.neutral.c70}
                    fontWeight={FONT_WEIGHTS.regular}
                    marginBottom={theme.spacing(2)}
                    fontSize={theme.spacing(2)}
                    textAlign="center"
                >
                    Para recuperar a sua senha, digite seu CPF e clique no botão de busca.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            label="CPF"
                            variant="filled"
                            fullWidth
                            {...register('cpf', { required: 'CPF é obrigatório' })}
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                            margin="normal"
                            value={cpfValue}
                            onChange={(e) => setCpfValue(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleSearchEmails} disabled={isLoading || !cpfValue}>
                                        <Search />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>

                    {data && (
                        <Card sx={{ marginTop: theme.spacing(2), width: '100%' }}>
                            <CardContent>
                                <Typography fontWeight={FONT_WEIGHTS.light} gutterBottom>
                                    Olá {data.name}!
                                </Typography>
                                <Typography fontWeight={FONT_WEIGHTS.regular} fontSize={14} gutterBottom>
                                    Escolha um email para receber o código de recuperação por email:
                                </Typography>
                                <Divider sx={{ marginBottom: theme.spacing(2) }} />
                                <RadioGroup
                                    value={selectedEmail}
                                    onChange={(e) => setSelectedEmail(e.target.value)}
                                >
                                    <FormControlLabel
                                        value={data.mainEmail}
                                        control={<Radio />}
                                        label={
                                            <Typography fontSize={14}>
                                                Email Principal: {data.mainEmail}
                                            </Typography>
                                        }
                                    />
                                    {data.recoveryEmail && (
                                        <FormControlLabel
                                            value={data.recoveryEmail}
                                            control={<Radio />}
                                            label={
                                                <Typography fontSize={14}>
                                                    Email de Recuperação: {data.recoveryEmail}
                                                </Typography>
                                            }
                                        />
                                    )}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    )}

                    <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2} mt={3}>
                        <Button variant="outlined" onClick={() => navigate('/login')}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            startIcon={<Checkmark />}
                            variant="contained"
                            disabled={!selectedEmail}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </form>
            </Stack>
        </ErrorContainer>
    )
}

export default RecoverPasswordPage