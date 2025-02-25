import { FC } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Box, Button, Grid, MenuItem, TextField, IconButton, useTheme } from "@mui/material"
import { Add } from "@mui/icons-material"
import { TrashCan } from "@carbon/icons-react"
import { PersonRegisterType } from "../../../types/person-register"

const PersonalDataForm: FC = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<PersonRegisterType>()
    const theme = useTheme()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phoneList",
    })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Nome"
                    {...register("name")}
                    variant="filled"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Gênero"
                    {...register("genderAcronym")}
                    variant="filled"
                    error={!!errors.genderAcronym}
                    helperText={errors.genderAcronym?.message}
                >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Feminino</MenuItem>
                    <MenuItem value="O">Outro</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Email"
                    {...register("mainEmail")}
                    variant="filled"
                    error={!!errors.mainEmail}
                    helperText={errors.mainEmail?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="CPF"
                    {...register("cpf")}
                    variant="filled"
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    {...register("password")}
                    variant="filled"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type="date"
                    label="Data de Nascimento"
                    {...register("birthDate")}
                    InputLabelProps={{ shrink: true }}
                    variant="filled"
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
                />
            </Grid>
            <Grid item xs={12}>
                {fields.map((field, index) => (
                    <Box
                        key={field.id}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={1}
                    >
                        <TextField
                            label="DDI"
                            type="number"
                            {...register(`phoneList.${index}.ddiNumber`, { valueAsNumber: true })}
                            variant="filled"
                            error={!!errors.phoneList?.[index]?.ddiNumber}
                            helperText={errors.phoneList?.[index]?.ddiNumber?.message}
                            sx={{ width: 80 }}
                        />
                        <TextField
                            label="DDD"
                            type="number"
                            {...register(`phoneList.${index}.dddNumber`, { valueAsNumber: true })}
                            variant="filled"
                            error={!!errors.phoneList?.[index]?.dddNumber}
                            helperText={errors.phoneList?.[index]?.dddNumber?.message}
                            sx={{ width: 80 }}
                        />
                        <TextField
                            fullWidth
                            label={`Telefone ${index + 1}`}
                            {...register(`phoneList.${index}.number`)}
                            variant="filled"
                            error={!!errors.phoneList?.[index]?.number}
                            helperText={errors.phoneList?.[index]?.number?.message}
                        />
                        <IconButton
                            sx={{ color: theme.palette.juicy.primary.c60 }}
                            onClick={() => remove(index)}
                        >
                            <TrashCan size={24} />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    variant="text"
                    startIcon={<Add />}
                    onClick={() => append({ number: "", dddNumber: 0, ddiNumber: 0 })}
                    sx={{ mt: 1 }}
                >
                    Adicionar Telefone
                </Button>
            </Grid>
        </Grid>
    )
}

export default PersonalDataForm
