import { FC } from "react"
import { useFormContext, useFieldArray, Controller } from "react-hook-form"
import { Box, Button, Grid, TextField, IconButton, useTheme, MenuItem } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { Add } from "@mui/icons-material"
import { TrashCan } from "@carbon/icons-react"
import { PersonRegisterType } from "../../../types/person-register"
import { useDDD } from "../../../hooks/phone/use-ddd"
import { useDDI } from "../../../hooks/phone/use-ddi"

const PersonalDataForm: FC = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<PersonRegisterType>()

    const theme = useTheme()

    const { ddds } = useDDD()
    const { ddis } = useDDI()

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
                        gap={2}
                        mb={1}
                    >
                        <Controller
                            name={`phoneList.${index}.ddiNumber`}
                            control={control}
                            defaultValue={field.ddiNumber}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    options={ddis || []}
                                    getOptionLabel={(option) => option.ddi.toString()}
                                    isOptionEqualToValue={(option, value) =>
                                        option.ddi === value.ddi
                                    }
                                    onChange={(_event, newValue) =>
                                        onChange(newValue ? newValue.ddi : 0)
                                    }
                                    value={
                                        ddis?.find((ddi) => ddi.ddi === value) || null
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="DDI"
                                            variant="filled"
                                            error={!!errors.phoneList?.[index]?.ddiNumber}
                                            helperText={errors.phoneList?.[index]?.ddiNumber?.message}
                                            sx={{ width: 120 }}
                                        />
                                    )}
                                />
                            )}
                        />
                        <Controller
                            name={`phoneList.${index}.dddNumber`}
                            control={control}
                            defaultValue={field.dddNumber}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    options={ddds || []}
                                    getOptionLabel={(option) => option.ddd.toString()}
                                    isOptionEqualToValue={(option, value) =>
                                        option.ddd === value.ddd
                                    }
                                    onChange={(_event, newValue) =>
                                        onChange(newValue ? newValue.ddd : 0)
                                    }
                                    value={
                                        ddds?.find((ddd) => ddd.ddd === value) || null
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="DDD"
                                            variant="filled"
                                            error={!!errors.phoneList?.[index]?.dddNumber}
                                            helperText={errors.phoneList?.[index]?.dddNumber?.message}
                                            sx={{ width: 120 }}
                                        />
                                    )}
                                />
                            )}
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
