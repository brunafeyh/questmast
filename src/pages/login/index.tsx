import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Paper,
    Stack,
    useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthCredentials, credentialsAuthSchema } from "../../types/auth";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { projectAbbreviation } from "../register";
import { TextField } from "../../components/table/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthCredentials>({
        resolver: zodResolver(credentialsAuthSchema),
    })

    const { login } = useAuth()

    const navigate = useNavigate()
    const theme = useTheme()

    const onSubmit = async (data: AuthCredentials) => {
        const success = await login(data);
        if (success) {
            navigate('/')
        } else {
            console.log('erro ao fazer login')
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <Box display="flex" height="100vh" width={'100%'}>
            <Box
                flex={1}
                bgcolor="#222"
                color="#fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding={4}
                sx={{
                    width: 770,
                    '@media screen and (min-width: 1800px)': {
                        width: 953
                    },
                }}
            >
                <Stack spacing={2} alignItems="center" textAlign="center">
                    <img
                        src="src/assets/images/logo-white.svg"
                        alt="QuestMast Logo"
                        style={{ width: "200px" }}
                    />
                    <Typography
                        color={theme.palette.juicy.neutral.c10}
                        fontSize={(theme) => theme.spacing(4)}
                        fontWeight={FONT_WEIGHTS.light}
                    >
                        <span style={{ color: theme.palette.juicy.primary.c60 }}>
                            {projectAbbreviation.slice(0, 5)}
                        </span>
                        {projectAbbreviation.slice(5)}
                    </Typography>
                </Stack>
            </Box>
            <Box
                flex={1}
                component={Paper}
                elevation={6}
                square
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding={4}
                sx={{
                    width: 766,
                   '@media screen and (min-width: 1800px)': {
                        width: 966
                    },
                }}
            >
                <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%" maxWidth="350px">
                    <Stack spacing={2}>
                        <Typography fontWeight={FONT_WEIGHTS.light} fontSize={theme.spacing(2.5)}>Acessar conta:</Typography>
                        <TextField
                            label="Usuário"
                            fullWidth
                            variant="filled"
                            {...register("mainEmail")}
                            error={!!errors.mainEmail}
                            helperText={errors.mainEmail?.message}
                        />
                        <TextField
                            label="Senha"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            variant="filled"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, backgroundColor: "#26c6da", ":hover": { backgroundColor: "#1eaaa9" } }}
                        >
                            Entrar
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
