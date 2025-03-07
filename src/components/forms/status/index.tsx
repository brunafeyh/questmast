import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, MenuItem, Box, Typography } from '@mui/material';
import { useStatus } from '../../../hooks/use-status';
import { useSelectionProcessMutations } from '../../../hooks/selection-process/use-selection-process-mutations';
import { FONT_WEIGHTS } from '../../../utils/constants/theme';
import { TextField } from '../../table/styles';
import Loading from '../../loading';

type FormData = {
    statusId: number;
};

interface UpdateStatusFormProps {
    id: number
    handleClose: () => void | undefined 
}

export const UpdateStatusForm: FC<UpdateStatusFormProps> = ({ id, handleClose }) => {
    const { register, handleSubmit } = useForm<FormData>();
    const { status: statuses, isLoading } = useStatus()
    const { updateSelectionProcessStatus } = useSelectionProcessMutations()

    const onSubmit = async (data: FormData) => {
        try {
            await updateSelectionProcessStatus.mutateAsync({
                id,
                selectionProcessStatusId: data.statusId,
            })
            handleClose()
        }
        catch (err) {
            console.log(err)
        }
    }

    if (isLoading || updateSelectionProcessStatus.isPending) return <Loading />

    return (
        <Box width={350}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography fontSize={18} fontWeight={FONT_WEIGHTS.light} mb={2}>Alterar Status do Processo Seletivo</Typography>
                <TextField
                    select
                    label="Status"
                    {...register('statusId', { required: true })}
                    variant="filled"
                >
                    {statuses?.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                            {status.description}
                        </MenuItem>
                    ))}
                </TextField>
                <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">
                        Atualizar Status
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
