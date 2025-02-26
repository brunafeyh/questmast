import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { Questao, QuestaoTipo } from "../../components/question";
import { PageLayout } from "../../layout";

type FormData = {
    respostas: number[]
}

const questoesFicticias: QuestaoTipo[] = [
    {
        id: "q1",
        ano: 2024,
        banca: "lorem",
        orgao: "loremOrg",
        nivel: "Difícil",
        categoria: "Inglês",
        enunciado:
            "O vírus do tipo worm faz parte de uma categoria específica de malware. Qual das características a seguir define melhor um vírus worm?",
        opcoes: [
            { texto: "blablablabla" },
            { texto: "blablablabla" },
            { texto: "blablablabla" },
            { texto: "blablablabla" },
        ],
        correta: 2,
    },
    {
        id: "q2",
        ano: 2024,
        banca: "lorem",
        orgao: "loremOrg",
        nivel: "Difícil",
        categoria: "Inglês",
        enunciado:
            "O vírus do tipo worm faz parte de uma categoria específica de malware. Qual das características a seguir define melhor um vírus worm?",
        opcoes: [
            { texto: "aaaa" },
            { texto: "bbbb" },
            { texto: "cccc" },
            { texto: "dddd" },
        ],
        correta: 1,
    },
]

const TestPage: FC = () => {
    const theme = useTheme()
    const [foiSubmetido, setFoiSubmetido] = useState(false);
    const [acertos, setAcertos] = useState<number | null>(null);

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            respostas: questoesFicticias.map(() => -1),
        },
    })

    const onSubmit = (data: FormData) => {
        let contadorAcertos = 0;
        data.respostas.forEach((resposta, index) => {
            if (resposta === questoesFicticias[index].correta) {
                contadorAcertos++;
            }
        });
        setAcertos(contadorAcertos);
        setFoiSubmetido(true);
    }

    const respostasSelecionadas = watch("respostas");

    return (
        <PageLayout title="Prova">
            <Box
                sx={{
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    width: 1600,
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
                <Typography sx={{ mb: 4 }} >
                    Prova "blablablab" Nº 007
                </Typography>

                {foiSubmetido && acertos !== null && (
                    <Chip sx={{ mb: 2 }} label={` Você acertou ${acertos} de ${questoesFicticias.length} questões.`} color="primary" variant="outlined" />
                )}


                <form onSubmit={handleSubmit(onSubmit)}>
                    {questoesFicticias.map((questao, i) => {
                        const userAnswer = respostasSelecionadas[i];

                        return (
                            <Questao
                                key={questao.id}
                                questao={questao}
                                index={i}
                                register={register}
                                respostaSelecionada={userAnswer}
                                foiSubmetido={foiSubmetido}
                            />
                        );
                    })}

                    <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                        <Button variant="outlined" type="button" onClick={() => console.log("Cancelar")}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            Concluir
                        </Button>
                    </Box>
                </form>
            </Box>
        </PageLayout>
    )
}

export default TestPage
