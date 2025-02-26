import { useForm, useFieldArray } from 'react-hook-form';
import {
    Box,
    Typography,
    Button,
    Grid,
    MenuItem,
    TextField,
    useTheme,
} from '@mui/material';
import { Add } from '@carbon/icons-react';
import { FONT_WEIGHTS } from '../../utils/constants/theme';
import { PageLayout } from '../../layout';
import { FormValues } from '../../types/test';
import { ExamForm } from '../../components/forms/exam';
import { FC } from 'react';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '../../contexts/is-sidebar-collapsed';

const AddSelectionProcess: FC = () => {
    const theme = useTheme()
    const [isCollapsed] = useAtom(isCollapsedAtom)
    const { register, control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            title: '',
            institution: '',
            year: new Date().getFullYear(),
            status: '',
            examBoard: '',
            exams: [],
        },
    });

    const { fields: examsFields, append: appendExam, remove: removeExam } =
        useFieldArray({
            control,
            name: 'exams',
        });

    const onSubmit = (data: FormValues) => {
        console.log('Submitted Data:', data);
    };

    return (
        <PageLayout title="Adicionar Processo Seletivo">
            <Box
                sx={{
                    height: '90vh',
                    overflowY: 'auto',
                    width: isCollapsed ? 1393: 1205,
                    '@media screen and (min-width:1800px)': {
                        width: 1600,
                    },
                    overflowX: 'auto',
                    "&::-webkit-scrollbar": {
                        width: theme.spacing(1)
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: theme.palette.juicy.neutral.c30,
                        borderRadius: theme.spacing(0.5),
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.palette.juicy.neutral.c50,
                        borderRadius: theme.spacing(0.5),
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: theme.palette.juicy.neutral.c60,
                    },
                }}
            >
                <Box sx={{
                    width: '100%',
                    '@media screen and (min-width:1800px)': {
                        maxWidth: '1560px'
                    },
                    maxWidth: '1200'
                }}>
                    <Typography fontWeight={FONT_WEIGHTS.light} mb={4}>
                        Adicionar Processo Seletivo
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Título"
                                    variant="filled"
                                    fullWidth
                                    {...register('title')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Instituição"
                                    variant="filled"
                                    fullWidth
                                    {...register('institution')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Ano"
                                    variant="filled"
                                    type="number"
                                    fullWidth
                                    {...register('year')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Status"
                                    variant="filled"
                                    select
                                    fullWidth
                                    {...register('status')}
                                >
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                    <MenuItem value="Concluded">Concluded</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Banca"
                                    variant="filled"
                                    fullWidth
                                    {...register('examBoard')}
                                />
                            </Grid>
                        </Grid>

                        <Box display="flex" flexDirection="column" gap={2} mt={2}>
                            <Typography fontWeight={FONT_WEIGHTS.light}>
                                Provas
                            </Typography>
                            {examsFields.map((item, index) => (
                                <ExamForm
                                    key={item.id}
                                    nestIndex={index}
                                    register={register}
                                    control={control}
                                    remove={removeExam}
                                />
                            ))}
                            <Button
                                variant="text"
                                startIcon={<Add />}
                                onClick={() =>
                                    appendExam({
                                        id: crypto.randomUUID(),
                                        name: '',
                                        position: '',
                                        questions: [],
                                    })
                                }
                            >
                                Adicionar Provas
                            </Button>
                        </Box>

                        <Box mt={4}>
                            <Button variant="contained" color="primary" type="submit">
                                Salvar Processo Seletivo
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </PageLayout>
    )
}

export default AddSelectionProcess
