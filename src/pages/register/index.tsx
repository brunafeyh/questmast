import { FC, useState } from "react";
import { Box, Button, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personRegisterSchema, PersonRegisterType, validationSchemas } from "../../types/person-register";
import AddressForm from "../../components/forms/address";
import { PERSON_DEFAULT } from "../../utils/constants/default";
import PersonalDataForm from "../../components/forms/personal-data";
import { Tab, Tabs } from "../home/styles";
import { registersteps } from "../../utils/constants";

export const projectAbbreviation = 'QuestMast'

export const RegisterPage: FC = () => {
    const [activeStep, setActiveStep] = useState(0)
    const theme = useTheme()

    const methods = useForm<PersonRegisterType>({
        resolver: zodResolver(personRegisterSchema),
        defaultValues: PERSON_DEFAULT,
        mode: "onTouched",
    })

    const handleNextStep = async () => {
        const currentSchema = validationSchemas[activeStep];
        const fieldsToValidate = Object.keys(currentSchema.shape) as (keyof PersonRegisterType)[];
        const isStepValid = await methods.trigger(fieldsToValidate)
        if (isStepValid) setActiveStep((prev) => prev + 1)
    }

    const handleBack = () => setActiveStep((prev) => prev - 1)

    const handleFormSubmit = (data: PersonRegisterType) => {
        console.log("Dados enviados:", data);
    }

    return (
        <FormProvider {...methods}>
            <Stack maxWidth="md" sx={{
                height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                ml: 40,
                '@media (min-width: 1600px)': {
                    ml: 58,
                },

            }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} textAlign="center">
                        <Box mb={4} textAlign="center">
                            <img src="src/assets/images/logo-black.svg" />
                            <Typography fontSize={theme.spacing(3)}><span style={{ color: theme.palette.juicy.primary.c60 }}>
                                {projectAbbreviation.slice(0, 5)}
                            </span>
                                {projectAbbreviation.slice(5)}</Typography>
                        </Box>

                        <Tabs
                            value={activeStep}
                            onChange={handleNextStep}
                            sx={{ mb: 2 }}
                        >
                            <Tab label="Dados Gerais" />
                            <Tab label="Endereço" />
                        </Tabs>

                        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                            <Box sx={{ mb: 4 }}>
                                {activeStep === 0 && <PersonalDataForm />}
                                {activeStep === 1 && <AddressForm />}
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Button variant="text" disabled={activeStep === 0} onClick={handleBack}>
                                    Anterior
                                </Button>
                                {activeStep < registersteps.length - 1 ? (
                                    <Button variant="contained" onClick={handleNextStep}>
                                        Próximo
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="contained">
                                        Finalizar
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Stack>
        </FormProvider>
    );
}