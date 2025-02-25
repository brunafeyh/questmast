import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Grid,
    Typography,
    Paper,
} from "@mui/material";
import { Questao, QuestaoTipo } from "../../question";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";

type FormData = {
    respostas: number[]
}

const questoesFicticias: QuestaoTipo[] = [
    {
        id: "q1",
        ano: 2024,
        banca: "Lorem",
        orgao: "LoremOrg",
        nivel: "Difícil",
        categoria: "Inglês",
        enunciado:
            "O vírus do tipo worm faz parte de uma categoria específica de malware. Qual das características a seguir define melhor um vírus worm?",
        opcoes: [
            { texto: "Ele se replica sem precisar de hospedeiro" },
            { texto: "Ele precisa ser executado manualmente" },
            { texto: "Ele não se replica" },
            { texto: "Ele não pode ser detectado por antivírus" },
        ],
        correta: 0,
    },
    {
        id: "q2",
        ano: 2024,
        banca: "Lorem",
        orgao: "LoremOrg",
        nivel: "Médio",
        categoria: "Informática",
        enunciado:
            "Qual das alternativas descreve melhor uma falha de segurança?",
        opcoes: [
            { texto: "Opção A" },
            { texto: "Opção B" },
            { texto: "Opção C" },
            { texto: "Opção D" },
        ],
        correta: 2,
    },
];

export default function QuestionaryForm() {
    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: { respostas: Array(questoesFicticias.length).fill(-1) },
    })
    const [loading, setLoading] = useState(false)
    const [foiSubmetido, setFoiSubmetido] = useState(false)
    const respostasSelecionadas = watch("respostas")

    const onSubmit = (data: FormData) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setFoiSubmetido(true);
            console.log("Respostas enviadas:", data.respostas)
        }, 1000)
    }

    return (
        <Paper elevation={0} sx={{ width: "100%" }}>
            {!loading && (
                <>
                    <Typography fontWeight={FONT_WEIGHTS.regular} sx={{ mb: 3 }}>
                        Responda as questões abaixo:
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {questoesFicticias.map((questao, index) => (
                            <Questao
                                key={questao.id}
                                questao={questao}
                                index={index}
                                register={register}
                                respostaSelecionada={respostasSelecionadas[index]}
                                foiSubmetido={foiSubmetido}
                            />
                        ))}

                        <Grid container spacing={2} justifyContent="flex-end" mt={2} >
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={foiSubmetido}
                                >
                                    {"Enviar Respostas"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}

            {foiSubmetido && !loading && (
                <Box sx={{ mt: 4 }}>
                    <Typography fontWeight={FONT_WEIGHTS.regular}>
                        Resultado:
                    </Typography>
                    <Typography  fontWeight={FONT_WEIGHTS.light}>
                        Você acertou{" "}
                        {
                            respostasSelecionadas.filter(
                                (resposta, i) => resposta === questoesFicticias[i].correta
                            ).length
                        }{" "}
                        de {questoesFicticias.length} questões.
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
