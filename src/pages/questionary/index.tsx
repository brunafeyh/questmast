import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
	Box,
	Button,
	Divider,
	IconButton,
	MenuItem,
	Typography,
	Paper,
	useTheme,
	Stack,
} from "@mui/material";
import { PageLayout } from "../../layout";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { TextField } from "../../components/table/styles";
import { Add, TrashCan } from "@carbon/icons-react";
import { JUICY_COLORS } from "../../themes/colors";
import PagesHeader from "../../components/pages-header";
import QuestionaryForm from "../../components/forms/questionary";
import Loading from "../../components/loading";

type QuestionData = {
	disciplina: string;
	dificuldade: string;
	numeroQuestoes: number;
};

type FormInputs = {
	concurso: string;
	banca: string;
	cargo: string;
	nivel: string;
	numeroQuestoesGerais: number;
	questoes: QuestionData[];
};

export default function Questionary() {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: {
			concurso: "",
			banca: "",
			cargo: "",
			nivel: "",
			numeroQuestoesGerais: 10,
			questoes: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "questoes",
	});

	const onSubmit = (data: FormInputs) => {
		console.log("Formulário submetido:", data);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowQuestions(true);
		}, 1000);
	};

	if (loading) return <Loading />;

	return (
		<PageLayout title="Questionário">
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 4,
					height: "90vh",
					width: "100%",
					boxSizing: "border-box",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						p: 3,
						height: 470,
						width: 405
					}}
				>
					<Stack spacing={2}>
						<PagesHeader
							title="Questionário"
							rightSideComponent={
								<Button
									variant="text"
									onClick={() => console.log("Gerar questionário via IA")}
								>
									Usar Inteligência Artificial
								</Button>
							}
						/>
						<Divider />
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							<Stack spacing={1}>
								<Box sx={{
									display: "flex",
									flexDirection: "row",
									gap: 1,
								}}>
									<TextField
										fullWidth
										select
										label="Concurso"
										variant="filled"
										{...register("concurso")}
										error={!!errors.concurso}
										helperText={errors.concurso?.message}
									>
										<MenuItem value="">Selecione...</MenuItem>
										<MenuItem value="Concurso A">Concurso A</MenuItem>
										<MenuItem value="Concurso B">Concurso B</MenuItem>
									</TextField>

									<TextField
										fullWidth
										select
										label="Banca"
										variant="filled"
										{...register("banca")}
										error={!!errors.banca}
										helperText={errors.banca?.message}
									>
										<MenuItem value="">Selecione...</MenuItem>
										<MenuItem value="Banca X">Banca X</MenuItem>
										<MenuItem value="Banca Y">Banca Y</MenuItem>
									</TextField>
								</Box>

								<Box sx={{
									display: "flex",
									flexDirection: "row",
									gap: 1,
								}}>
									<TextField
										fullWidth
										select
										label="Cargo"
										variant="filled"
										{...register("cargo")}
										error={!!errors.cargo}
										helperText={errors.cargo?.message}
									>
										<MenuItem value="">Selecione...</MenuItem>
										<MenuItem value="Analista">Analista</MenuItem>
										<MenuItem value="Técnico">Técnico</MenuItem>
									</TextField>

									<TextField
										fullWidth
										select
										label="Instituição"
										variant="filled"
										{...register("nivel")}
										error={!!errors.nivel}
										helperText={errors.nivel?.message}
									>
										<MenuItem value="">Selecione...</MenuItem>
										<MenuItem value="Fácil">Fácil</MenuItem>
										<MenuItem value="Médio">Médio</MenuItem>
										<MenuItem value="Difícil">Difícil</MenuItem>
									</TextField>
								</Box>
							</Stack>

							<Typography sx={{ mt: 2, fontWeight: FONT_WEIGHTS.medium }}>
								Questões
							</Typography>

							<Stack spacing={2}>
								{fields.map((field, index) => (
									<Box
										key={field.id}
										sx={{
											display: "flex",
											flexDirection: { xs: "column", sm: "row" },
											alignItems: "center",
											gap: 1,
										}}
									>
										<TextField
											fullWidth
											label="Disciplina"
											variant="filled"
											{...register(`questoes.${index}.disciplina`)}
											sx={{ width: 120 }}
										/>
										<TextField
											fullWidth
											select
											label="Dificuldade"
											variant="filled"
											sx={{ width: 130 }}
											{...register(`questoes.${index}.dificuldade`)}
										>
											<MenuItem value="">Selecione...</MenuItem>
											<MenuItem value="Fácil">Fácil</MenuItem>
											<MenuItem value="Médio">Médio</MenuItem>
											<MenuItem value="Difícil">Difícil</MenuItem>
										</TextField>
										<TextField
											fullWidth
											label="Qtd."
											type="number"
											variant="filled"
											{...register(`questoes.${index}.numeroQuestoes`, {
												valueAsNumber: true,
											})}
											sx={{ width: 70 }}
										/>
										<IconButton onClick={() => remove(index)}>
											<TrashCan color={JUICY_COLORS.error.c50} />
										</IconButton>
									</Box>
								))}
							</Stack>

							<Button
								variant="text"
								onClick={() =>
									append({
										disciplina: "",
										dificuldade: "",
										numeroQuestoes: 1,
									})
								}
								startIcon={<Add />}
								sx={{ mt: 2 }}
							>
								Adicionar Questões
							</Button>

							<Button type="submit" variant="contained">
								Gerar questionário
							</Button>
						</Box>
					</Stack>
				</Paper>
				<Box
					sx={{
						flex: 1,
						height: "85vh",
						overflowY: "auto",
						'@media screen and (min-width:1800px)': {
							width: 1152,
						},
						pr: 2,
						"&::-webkit-scrollbar": {
							width: theme.spacing(1),
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
					{showQuestions && <QuestionaryForm />}
				</Box>
			</Box>
		</PageLayout>
	);
}
