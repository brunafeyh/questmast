import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { SelectionProcess, selectionProcessSchema } from "../../../types/selection-process";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";
import { TextField } from "../../table/styles";

type SelectionProcessFormProps = {
    handleCloseModal: () => void | undefined
}
const SelectionProcessForm: FC<SelectionProcessFormProps> = ({ handleCloseModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SelectionProcess>({
        resolver: zodResolver(selectionProcessSchema),
        defaultValues: {
            name: "",
            openingDate: "",
            url: "",
            cityId: 0,
            boardExaminerId: 0,
            institutionId: 0,
            contentModeratorId: 0,
            selectionProcessStatusId: 0,
        },
    });

    const onSubmit = (data: SelectionProcess) => {
        console.log("Dados do formulário:", data);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
            }}
        >
            <Typography fontWeight={FONT_WEIGHTS.light}>Adicionar Processo Seletivo</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                }}
            >
                <TextField
                    label="Nome"
                    variant="filled"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label="Data de Abertura"
                    type="date"
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                    {...register("openingDate")}
                    error={!!errors.openingDate}
                    helperText={errors.openingDate?.message}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                }}
            >

                <TextField
                    label="URL"
                    variant="filled"
                    {...register("url")}
                    error={!!errors.url}
                    helperText={errors.url?.message}
                />

                <TextField
                    label="City ID"
                    variant="filled"
                    type="number"
                    {...register("cityId", { valueAsNumber: true })}
                    error={!!errors.cityId}
                    helperText={errors.cityId?.message}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                }}
            >

                <TextField
                    label="Board Examiner ID"
                    variant="filled"
                    type="number"
                    {...register("boardExaminerId", { valueAsNumber: true })}
                    error={!!errors.boardExaminerId}
                    helperText={errors.boardExaminerId?.message}
                />

                <TextField
                    label="Institution ID"
                    variant="filled"
                    type="number"
                    {...register("institutionId", { valueAsNumber: true })}
                    error={!!errors.institutionId}
                    helperText={errors.institutionId?.message}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                }}
            >

                <TextField
                    label="Content Moderator ID"
                    variant="filled"
                    type="number"
                    {...register("contentModeratorId", { valueAsNumber: true })}
                    error={!!errors.contentModeratorId}
                    helperText={errors.contentModeratorId?.message}
                />

                <TextField
                    label="Selection Process Status ID"
                    type="number"
                    variant="filled"
                    {...register("selectionProcessStatusId", { valueAsNumber: true })}
                    error={!!errors.selectionProcessStatusId}
                    helperText={errors.selectionProcessStatusId?.message}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    width: '100%'
                }}
            >
                <Button fullWidth variant="outlined" onClick={handleCloseModal}>
                    Cancelar
                </Button>
                <Button fullWidth variant="contained" type="submit">
                    Enviar
                </Button>
            </Box>
        </Box>
    )
}

export default SelectionProcessForm
