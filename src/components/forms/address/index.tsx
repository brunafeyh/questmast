import { useFormContext } from "react-hook-form";
import { CircularProgress, Grid, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { PersonRegisterType } from "../../../types/person-register";
import { TextField } from "../../table/styles";
import { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { useExternAddressByCep } from "../../../hooks/use-extern-address-by-cep";
import { useStreetType } from "../../../hooks/use-street-type";

const AddressForm = () => {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<PersonRegisterType>();

    const cepValue = watch("specificAddressFormDTO.cep");

    const { streetType } = useStreetType();

    const { adress, refetch, isLoading } = useExternAddressByCep(cepValue, { enabled: false });

    const handleCepSearch = async () => {
        if (cepValue) {
            await refetch();
        }
    };

    useEffect(() => {
        if (adress) {
            setValue("specificAddressFormDTO.street", adress.street);
            setValue("specificAddressFormDTO.streetType", adress.streetType);
            setValue("specificAddressFormDTO.neighborhood", adress.neighborhood);
            setValue("specificAddressFormDTO.city", adress.city);
            setValue("specificAddressFormDTO.federateUnit", adress.federateUnit);
        }
    }, [adress, setValue]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="CEP"
                    {...register("specificAddressFormDTO.cep")}
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.specificAddressFormDTO?.cep}
                    helperText={errors.specificAddressFormDTO?.cep?.message}
                    onBlur={handleCepSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleCepSearch}>
                                    {isLoading ? <CircularProgress /> : <Search />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Número"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("specificAddressFormDTO.number")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.number}
                    helperText={errors.specificAddressFormDTO?.number?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Logradouro"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("specificAddressFormDTO.street")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.street}
                    helperText={errors.specificAddressFormDTO?.street?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Tipo de Logradouro"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("specificAddressFormDTO.streetType")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.streetType}
                    helperText={errors.specificAddressFormDTO?.streetType?.message}
                >
                    {streetType?.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Complemento"
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("specificAddressFormDTO.federateUnit")}
                    variant="filled"
                    error={!!errors.specificAddressFormDTO?.federateUnit}
                    helperText={errors.specificAddressFormDTO?.federateUnit?.message}
                />
            </Grid>
        </Grid>
    )
}

export default AddressForm
