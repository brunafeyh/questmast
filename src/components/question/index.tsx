import { Box, Typography, Radio, FormControlLabel, RadioGroup, useTheme } from "@mui/material";
import { JUICY_COLORS } from "../../themes/colors";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { NivelChip } from "../chips/nivel-chip";
import { RadioIcons } from "./radio-icons";

type Opcao = {
    texto: string;
};

export type QuestaoTipo = {
    id: string;
    ano: number;
    banca: string;
    orgao: string;
    nivel: string;
    categoria: string;
    enunciado: string;
    opcoes: Opcao[];
    correta: number;
};

type QuestaoProps = {
    questao: QuestaoTipo;
    index: number;
    register: any;
    respostaSelecionada?: number;
    foiSubmetido?: boolean;
};

export const Questao: React.FC<QuestaoProps> = ({
    questao,
    index,
    register,
    respostaSelecionada,
    foiSubmetido,
}) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                border: `1px solid ${JUICY_COLORS.neutral.c20}`,
                overflowX: 'auto'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    mb: 1,
                    p: 2,
                    overflowX: 'auto',
                    backgroundColor: theme.palette.juicy.neutral.c20,
                }}
            >
                <Typography fontSize={theme.spacing(1.75)}>
                    <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Ano:</span>{" "}
                    {questao.ano}
                </Typography>
                <Typography fontSize={theme.spacing(1.75)}>
                    <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Banca:</span>{" "}
                    {questao.banca}
                </Typography>
                <Typography fontSize={theme.spacing(1.75)}>
                    <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Órgão:</span>{" "}
                    {questao.orgao}
                </Typography>
                <Typography fontSize={theme.spacing(1.75)}>
                    <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Nível:</span>{" "}
                    <NivelChip nivel={questao.nivel} />
                </Typography>
                <Typography fontSize={theme.spacing(1.75)}>
                    <span style={{ fontWeight: FONT_WEIGHTS.medium }}>Categoria:</span>{" "}
                    {questao.categoria}
                </Typography>
            </Box>

            <Typography sx={{ fontWeight: 500, p: 2 }}>
                {questao.enunciado}
            </Typography>

            <RadioGroup sx={{ p: 2 }}>
                {questao.opcoes.map((op, opIndex) => {
                    const isCorreta = opIndex === questao.correta;
                    const isSelecionada = opIndex === Number(respostaSelecionada);

                    const { icon, checkedIcon } = RadioIcons(
                        foiSubmetido,
                        isCorreta,
                        isSelecionada
                    );

                    return (
                        <FormControlLabel
                            key={opIndex}
                            control={
                                <Radio
                                    {...register(`respostas.${index}`, { value: opIndex })}
                                    value={opIndex}
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                />
                            }
                            label={op.texto}
                        />
                    );
                })}

            </RadioGroup>
        </Box>
    );
};
