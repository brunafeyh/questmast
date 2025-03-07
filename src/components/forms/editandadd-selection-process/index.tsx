import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  SelectionProcess,
  SelectionProcessList,
  selectionProcessSchema,
} from "../../../types/selection-process";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";
import { useAuth } from "../../../hooks/use-auth";
import { useStatus } from "../../../hooks/use-status";
import { useInstitution } from "../../../hooks/use-institution";
import { useBoardExaminer } from "../../../hooks/use-board-examiner";
import { useFederateUnit } from "../../../hooks/use-federate-unit";
import { useCityByUF } from "../../../hooks/use-cities-by-uf";
import Loading from "../../loading";
import { useSelectionProcessMutations } from "../../../hooks/selection-process/use-selection-process-mutations";
import { getDefaultSelectionProcess } from "../../../utils/get-default-selection-process";

type SelectionProcessFormProps = {
  handleCloseModal: () => void;
  id?: number;
  selectionProcess?: SelectionProcessList;
};

const SelectionProcessForm: FC<SelectionProcessFormProps> = ({
  handleCloseModal,
  id,
  selectionProcess,
}) => {
  const { user } = useAuth();
  const email = user?.email || "";
  const { status } = useStatus();
  const { institutions } = useInstitution();
  const { boardExaminers } = useBoardExaminer();
  const { federateUnit } = useFederateUnit();

  const SELECTION_PROCESS: SelectionProcess = {
    name: "",
    openingDate: "",
    url: "",
    contentModeratorEmail: email,
    cityFormDTO: {
      city: "",
      federateUnit: "",
    },
    boardExaminerId: 0,
    institutionId: 0,
    selectionProcessStatusId: 0,
  };

  const defaultValues = id
    ? getDefaultSelectionProcess(selectionProcess)
    : SELECTION_PROCESS;

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SelectionProcess>({
    resolver: zodResolver(selectionProcessSchema),
    defaultValues,
  })

  useEffect(() => {
    if (selectionProcess && id) {
      reset(getDefaultSelectionProcess(selectionProcess));
    }
  }, [selectionProcess, id, reset]);

  const selectedUF = watch("cityFormDTO.federateUnit");
  const { cityes, refetch, isLoading } = useCityByUF(selectedUF, { enabled: false });
  const { createSelectionProcess, updateSelectionProcess } = useSelectionProcessMutations();

  useEffect(() => {
    if (selectedUF) {
      refetch();
    }
  }, [selectedUF, refetch]);

  const onSubmit = async (data: SelectionProcess) => {
    try {
      if (id) await updateSelectionProcess.mutateAsync({ form: data, id });
      else await createSelectionProcess.mutateAsync(data);
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar processo de seleção:", error);
    }
  };

  if (isLoading || createSelectionProcess.isPending) return <Loading />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <Typography fontWeight={FONT_WEIGHTS.light}>
        {id ? "Editar Processo Seletivo" : "Adicionar Processo Seletivo"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome"
            variant="filled"
            fullWidth
            defaultValue={defaultValues.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Data de Abertura"
            type="date"
            variant="filled"
            fullWidth
            InputLabelProps={{ shrink: true }}
            defaultValue={defaultValues.openingDate}
            {...register("openingDate")}
            error={!!errors.openingDate}
            helperText={errors.openingDate?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="URL"
            variant="filled"
            fullWidth
            defaultValue={defaultValues.url}
            {...register("url")}
            error={!!errors.url}
            helperText={errors.url?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cityFormDTO.federateUnit"
            control={control}
            defaultValue={defaultValues.cityFormDTO.federateUnit}
            render={({ field }) => (
              <TextField
                select
                label="Unidade Federativa"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.cityFormDTO?.federateUnit}
                helperText={errors.cityFormDTO?.federateUnit?.message}
              >
                {federateUnit?.map((unit) => (
                  <MenuItem key={unit.acronym} value={unit.acronym}>
                    {unit.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="cityFormDTO.city"
            control={control}
            defaultValue={defaultValues.cityFormDTO.city}
            render={({ field }) => (
              <TextField
                select
                label="Cidade"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.cityFormDTO?.city}
                helperText={errors.cityFormDTO?.city?.message}
              >
                {cityes?.map((city) => (
                  <MenuItem key={city.city} value={city.city}>
                    {city.city}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="boardExaminerId"
            control={control}
            defaultValue={defaultValues.boardExaminerId}
            render={({ field }) => (
              <TextField
                select
                label="Banca"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.boardExaminerId}
                helperText={errors.boardExaminerId?.message}
              >
                {boardExaminers?.map((examiner) => (
                  <MenuItem key={examiner.id} value={examiner.id}>
                    {examiner.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="institutionId"
            control={control}
            defaultValue={defaultValues.institutionId}
            render={({ field }) => (
              <TextField
                select
                label="Instituição"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.institutionId}
                helperText={errors.institutionId?.message}
              >
                {institutions?.map((inst) => (
                  <MenuItem key={inst.id} value={inst.id}>
                    {inst.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="selectionProcessStatusId"
            control={control}
            defaultValue={defaultValues.selectionProcessStatusId}
            render={({ field }) => (
              <TextField
                select
                label="Status"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.selectionProcessStatusId}
                helperText={errors.selectionProcessStatusId?.message}
              >
                {status?.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.description}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
            <Button fullWidth variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button fullWidth variant="contained" type="submit">
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectionProcessForm;
