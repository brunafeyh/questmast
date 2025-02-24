import { useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { PersonRegisterType } from "../../../types/person-register";
import { TextField } from "../../table/styles";

const AddressForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PersonRegisterType>();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="CEP"
                    {...register("specificAddressFormDTO.cep")}
                    variant='filled'
                    error={!!errors.specificAddressFormDTO?.cep}
                    helperText={errors.specificAddressFormDTO?.cep?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Rua"
                    {...register("specificAddressFormDTO.street")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.street}
                    helperText={errors.specificAddressFormDTO?.street?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Número"
                    {...register("specificAddressFormDTO.number")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.number}
                    helperText={errors.specificAddressFormDTO?.number?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Complemento"
                    {...register("specificAddressFormDTO.complement")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.complement}
                    helperText={errors.specificAddressFormDTO?.complement?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Bairro"
                    {...register("specificAddressFormDTO.neighborhood")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.neighborhood}
                    helperText={errors.specificAddressFormDTO?.neighborhood?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Cidade"
                    {...register("specificAddressFormDTO.city")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.city}
                    helperText={errors.specificAddressFormDTO?.city?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Estado"
                    {...register("specificAddressFormDTO.federalUnit")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.federalUnit}
                    helperText={errors.specificAddressFormDTO?.federalUnit?.message}
                />
            </Grid>
        </Grid>
    )
}

export default AddressForm