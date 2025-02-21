import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Typography,
	Paper,
	useTheme,
} from "@mui/material";
import { PageLayout } from "../../layout";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { TextField } from "../../components/table/styles";
import { Add, TrashCan } from "@carbon/icons-react";
import { JUICY_COLORS } from "../../themes/colors";
import PagesHeader from "../../components/pages-header";
import QuestionaryForm from "../../components/forms/questionary";

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
	const theme = useTheme()
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
	}

	return (
		<PageLayout title="Questionário">
			<Grid container spacing={3} sx={{ height: "90vh", width: "100%" }}>
				<Grid item xs={12} md={4}>
					<Paper elevation={3} sx={{ p: 3, width: 450 }}>
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

						<Divider sx={{ my: 2 }} />

						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							sx={{ display: "flex", flexDirection: "column", gap: 2 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
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
								</Grid>

								<Grid item xs={12} sm={6}>
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
								</Grid>

								<Grid item xs={12} sm={6}>
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
								</Grid>

								<Grid item xs={12} sm={6}>
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
								</Grid>
							</Grid>

							<Typography sx={{ mt: 3, fontWeight: FONT_WEIGHTS.medium }}>
								Questões
							</Typography>

							{fields.map((field, index) => (
								<Grid
									container
									spacing={2}
									key={field.id}
									sx={{ alignItems: "center" }}
								>
									<Grid item xs={12} sm={5}>
										<TextField
											fullWidth
											label="Disciplina"
											variant="filled"
											{...register(`questoes.${index}.disciplina`)}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<TextField
											fullWidth
											select
											label="Dificuldade"
											variant="filled"
											{...register(`questoes.${index}.dificuldade`)}
										>
											<MenuItem value="">Selecione...</MenuItem>
											<MenuItem value="Fácil">Fácil</MenuItem>
											<MenuItem value="Médio">Médio</MenuItem>
											<MenuItem value="Difícil">Difícil</MenuItem>
										</TextField>
									</Grid>
									<Grid item xs={12} sm={2}>
										<TextField
											fullWidth
											label="Qtd."
											type="number"
											variant="filled"
											{...register(`questoes.${index}.numeroQuestoes`, {
												valueAsNumber: true,
											})}
										/>
									</Grid>
									<Grid item xs={12} sm={1} sx={{ textAlign: "center" }}>
										<IconButton onClick={() => remove(index)}>
											<TrashCan color={JUICY_COLORS.error.c50} />
										</IconButton>
									</Grid>
								</Grid>
							))}

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
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box
						sx={{
							height: "90vh",
							overflowY: "auto",
							pr: 2,
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
						{loading && (
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: "100%",
									ml: 40
								}}
							>
								<CircularProgress size={40} />
							</Box>
						)}

						{showQuestions && !loading && (
							<QuestionaryForm />
						)}
					</Box>
				</Grid>
			</Grid>
		</PageLayout>
	);
}
