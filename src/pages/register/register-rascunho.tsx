import React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const steps = ["Dados Pessoais", "Endereço"];

export default function RegisterPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [telefones, setTelefones] = React.useState([""]);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleAddTelefone = () => {
        setTelefones((prev) => [...prev, ""]);
    };


    const handleChangeTelefone = (index: number, value: string) => {
        setTelefones((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Nome" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="Gênero" variant="outlined">
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                                <MenuItem value="O">Outro</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Email" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="CPF" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Data de Nascimento"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {telefones.map((telefone, index) => (
                                <Box key={index} display="flex" alignItems="center" mb={1}>
                                    <TextField
                                        fullWidth
                                        label="Telefone"
                                        variant="outlined"
                                        value={telefone}
                                        onChange={(e) => handleChangeTelefone(index, e.target.value)}
                                    />
                                </Box>
                            ))}
                            <Button
                                variant="text"
                                startIcon={<Add />}
                                onClick={handleAddTelefone}
                                sx={{ mt: 1 }}
                            >
                                Adicionar Telefone
                            </Button>
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="CEP" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Rua" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Número" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Complemento" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Bairro" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Cidade" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Estado" variant="outlined" />
                        </Grid>
                    </Grid>
                );
            default:
                return <div>Etapa desconhecida</div>;
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" mb={4}>
                <Box
                    component="img"
                    src="/assets/LogoBranca.png"
                    alt="Logo"
                    sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        QuestMast
                    </Typography>
                    <Typography variant="subtitle1">Registre-se</Typography>
                </Box>
            </Box>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mb: 4 }}>{renderStepContent(activeStep)}</Box>

            <Divider sx={{ mb: 4 }} />

            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Anterior
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={handleNext}>
                        Próximo
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => alert("Formulário finalizado!")}
                    >
                        Finalizar
                    </Button>
                )}
            </Box>
        </Container>
    )
}
