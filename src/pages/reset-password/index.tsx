import { FC, useState } from 'react';
import { Checkmark, ViewFilled, ViewOffFilled } from '@carbon/icons-react';
import { Box, Button, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorContainer from '../../layout/error';
import { FONT_WEIGHTS } from '../../utils/constants/theme';
import Header from '../../components/header';
import { Modal, useModal } from '../../components/modal';
import { ConfirmationModal } from '../../components/confirmation-modal';
import { useAuth } from '../../hooks/use-auth';
import Loading from '../../components/loading';
import { useForm } from 'react-hook-form';
import { UpdatePasswordVerificationForm } from '../../types/verify';
import { TextField } from '../../components/table/styles';

const ResetPasswordPage: FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const modal = useModal();
    const { data } = useParams<{ data: string }>();

    if (!data) return <Typography color="error">Parâmetros inválidos</Typography>;

    const [_, code] = data.split(':')

    const { register, handleSubmit, formState: { errors } } = useForm<UpdatePasswordVerificationForm>();

    const { updatePasswordMutation } = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(newPassword === e.target.value);
    }

    const onSubmit = () => {
        if (!passwordsMatch) return;
        updatePasswordMutation.mutate({
            newPassword: newPassword,
            resetPasswordCode: code,
        })
    }

    if (updatePasswordMutation.isPending) return <Loading />;

    return (
        <ErrorContainer>
            <Header
                projectAbbreviation="QuestMast"
                projectName="Sistema de Preparação de Processos Seletivos"
            />
            <Stack
                sx={{
                    flexDirection: 'column',
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
                    Redefinir Senha
                </Typography>
                <Typography
                    color={theme.palette.juicy.neutral.c70}
                    fontWeight={FONT_WEIGHTS.regular}
                    marginBottom={theme.spacing(2)}
                    fontSize={theme.spacing(2)}
                >
                    Insira uma nova senha e confirme abaixo.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="Nova Senha"
                        variant="filled"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        {...register('newPassword', { required: 'Senha é obrigatória' })}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowPassword}>
                                        {showPassword ? <ViewOffFilled /> : <ViewFilled />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirmar Senha"
                        variant="filled"
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={!passwordsMatch}
                        helperText={!passwordsMatch ? 'As senhas não coincidem' : ''}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? <ViewOffFilled /> : <ViewFilled />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2} mt={3}>
                        <Button variant="outlined" onClick={() => navigate('/login')}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            startIcon={<Checkmark />}
                            variant="contained"
                            disabled={!newPassword || !confirmPassword || !passwordsMatch}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </form>
            </Stack>

            <Modal ref={modal}>
                <ConfirmationModal
                    text="Tem certeza? Sem confirmação não há como entrar no sistema!"
                    onCancel={() => modal.current?.closeModal()}
                    onConfirm={() => navigate('/login')}
                />
            </Modal>
        </ErrorContainer>
    )
}

export default ResetPasswordPage
