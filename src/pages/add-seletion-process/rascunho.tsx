import { useForm, useFieldArray } from 'react-hook-form';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    MenuItem,
    Paper,
    Divider,
    TextField,
} from '@mui/material';
import { Add, TrashCan } from '@carbon/icons-react';
import { FONT_WEIGHTS } from '../../utils/constants/theme';
import { JUICY_COLORS } from '../../themes/colors';
import { PageLayout } from '../../layout';

type Opcao = { texto: string };

type QuestaoTipo = {
    id: string;
    enunciado: string;
    opcoes: Opcao[];
}

type ProvaTipo = {
    id: string;
    nome: string;
    cargo: string;
    questoes: QuestaoTipo[];
}

type FormValues = {
    titulo: string;
    instituicao: string;
    ano: number;
    status: string;
    banca: string;
    provas: ProvaTipo[];
}

const AlternativaItem = ({
    nestIndex,
    questaoIndex,
    opIndex,
    register,
    removeOpcao,
}: {
    nestIndex: number;
    questaoIndex: number;
    opIndex: number;
    register: any;
    removeOpcao: (index: number) => void;
}) => {
    return (
        <Box display="flex" alignItems="center" mb={1}>
            <TextField
                label={`Alternativa ${opIndex + 1}`}
                variant="filled"
                fullWidth
                margin="dense"
                {...register(`provas.${nestIndex}.questoes.${questaoIndex}.opcoes.${opIndex}.texto`)}
            />
            <IconButton onClick={() => removeOpcao(opIndex)} color="error">
                <TrashCan />
            </IconButton>
        </Box>
    )
}

const QuestaoItem = ({
    nestIndex,
    questaoIndex,
    register,
    control,
    removeQuestao,
}: {
    nestIndex: number;
    questaoIndex: number;
    register: any;
    control: any;
    removeQuestao: (index: number) => void;
}) => {
    const { fields: opcoesFields, append: appendOpcao, remove: removeOpcao } =
        useFieldArray({
            control,
            name: `provas.${nestIndex}.questoes.${questaoIndex}.opcoes`,
        });

    return (
        <Box
            mb={2}
            border={`1px solid ${JUICY_COLORS.neutral.c20}`}
            borderRadius={2}
            p={2}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >
                <Typography fontWeight={FONT_WEIGHTS.medium}>
                    Questão {questaoIndex + 1}
                </Typography>
                <IconButton onClick={() => removeQuestao(questaoIndex)} color="error">
                    <TrashCan />
                </IconButton>
            </Box>

            <TextField
                label="Enunciado"
                fullWidth
                variant="filled"
                multiline
                rows={3}
                margin="normal"
                {...register(`provas.${nestIndex}.questoes.${questaoIndex}.enunciado`)}
            />

            {opcoesFields.map((opcao, opIndex) => (
                <AlternativaItem
                    key={opcao.id}
                    nestIndex={nestIndex}
                    questaoIndex={questaoIndex}
                    opIndex={opIndex}
                    register={register}
                    removeOpcao={removeOpcao}
                />
            ))}

            <Button
                variant="text"
                startIcon={<Add />}
                onClick={() => appendOpcao({ texto: '' })}
                sx={{ mt: 1 }}
            >
                Adicionar Alternativa
            </Button>
        </Box>
    )
}

const QuestaoForm = ({
    nestIndex,
    register,
    control,
}: {
    nestIndex: number;
    register: any;
    control: any;
}) => {
    const {
        fields: questoesFields,
        append: appendQuestao,
        remove: removeQuestao,
    } = useFieldArray({
        control,
        name: `provas.${nestIndex}.questoes`,
    });

    return (
        <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Button
                    variant="text"
                    startIcon={<Add />}
                    onClick={() =>
                        appendQuestao({
                            id: crypto.randomUUID(),
                            enunciado: '',
                            opcoes: [{ texto: '' }],
                        })
                    }
                >
                    Adicionar Questão
                </Button>
            </Box>

            {questoesFields.map((questao, index) => (
                <QuestaoItem
                    key={questao.id}
                    nestIndex={nestIndex}
                    questaoIndex={index}
                    register={register}
                    control={control}
                    removeQuestao={removeQuestao}
                />
            ))}
        </Paper>
    );
}

const ProvaForm = ({
    register,
    control,
    nestIndex,
    remove: removeProva,
}: {
    register: any;
    control: any;
    nestIndex: number;
    remove: (index: number) => void;
}) => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight={FONT_WEIGHTS.regular} fontSize={14}>
                    Prova {nestIndex + 1}
                </Typography>
                <IconButton onClick={() => removeProva(nestIndex)} color="error">
                    <TrashCan />
                </IconButton>
            </Box>

            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        variant="filled"
                        label="Nome"
                        fullWidth
                        {...register(`provas.${nestIndex}.nome`)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        variant="filled"
                        label="Cargo"
                        fullWidth
                        {...register(`provas.${nestIndex}.cargo`)}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <QuestaoForm nestIndex={nestIndex} register={register} control={control} />
        </Paper>
    );
};

const AdicionarProcessoSeletivo = () => {
    const { register, control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            titulo: '',
            instituicao: '',
            ano: new Date().getFullYear(),
            status: '',
            banca: '',
            provas: [],
        },
    });

    const { fields: provasFields, append: appendProva, remove: removeProva } =
        useFieldArray({
            control,
            name: 'provas',
        });

    const onSubmit = (data: FormValues) => {
        console.log('Dados enviados:', data);
    };

    return (
        <PageLayout title="Adicionar Processo Seletivo">
            <Box
                sx={{
                    height: '90vh',
                    overflowY: 'auto',
                    overflowX: 'auto',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: '800px', p: 4 }}>
                    <Typography fontWeight={FONT_WEIGHTS.light} mb={4}>
                        Adicionar Processo Seletivo
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} mb={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Título"
                                    variant="filled"
                                    fullWidth
                                    {...register('titulo')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Instituição"
                                    variant="filled"
                                    fullWidth
                                    {...register('instituicao')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Ano"
                                    variant="filled"
                                    type="number"
                                    fullWidth
                                    {...register('ano')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Status"
                                    variant="filled"
                                    select
                                    fullWidth
                                    {...register('status')}
                                >
                                    <MenuItem value="Aberto">Aberto</MenuItem>
                                    <MenuItem value="Fechado">Fechado</MenuItem>
                                    <MenuItem value="Encerrado">Encerrado</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Banca"
                                    variant="filled"
                                    fullWidth
                                    {...register('banca')}
                                />
                            </Grid>
                        </Grid>

                        <Box display="flex" flexDirection="column" mb={2} gap={2}>
                            <Typography fontWeight={FONT_WEIGHTS.light}>Provas</Typography>
                            {provasFields.map((item, index) => (
                                <ProvaForm
                                    key={item.id}
                                    nestIndex={index}
                                    register={register}
                                    control={control}
                                    remove={removeProva}
                                />
                            ))}
                            <Button
                                variant="text"
                                startIcon={<Add />}
                                onClick={() =>
                                    appendProva({
                                        id: crypto.randomUUID(),
                                        nome: '',
                                        cargo: '',
                                        questoes: [],
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
    );
};

export default AdicionarProcessoSeletivo;
