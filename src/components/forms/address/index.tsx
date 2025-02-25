import { useFormContext } from "react-hook-form";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { PersonRegisterType } from "../../../types/person-register";
import { TextField } from "../../table/styles";
import { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { useExternAddressByCep } from "../../../hooks/use-extern-address-by-cep";

const AddressForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PersonRegisterType>();

  const cepValue = watch("specificAddressFormDTO.cep");

  const { adress, refetch } = useExternAddressByCep(cepValue, { enabled: false });

  const handleCepSearch = async () => {
    if (cepValue) {
      await refetch();
    }
  }

  useEffect(() => {
    if (adress) {
      setValue("specificAddressFormDTO.street", adress.street);
      setValue("specificAddressFormDTO.streetType", adress.streetType);
      setValue("specificAddressFormDTO.neighborhood", adress.neighborhood);
      setValue("specificAddressFormDTO.city", adress.city);
      setValue("specificAddressFormDTO.federalUnit", adress.federateUnit);
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
          error={!!errors.specificAddressFormDTO?.cep}
          helperText={errors.specificAddressFormDTO?.cep?.message}
          onBlur={handleCepSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCepSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
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
          label="Logradouro"
          {...register("specificAddressFormDTO.street")}
          variant="filled"
          error={!!errors.specificAddressFormDTO?.street}
          helperText={errors.specificAddressFormDTO?.street?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Tipo de Logradouro"
          {...register("specificAddressFormDTO.streetType")}
          variant="filled"
          error={!!errors.specificAddressFormDTO?.streetType}
          helperText={errors.specificAddressFormDTO?.streetType?.message}
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