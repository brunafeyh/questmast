import { FC, useEffect, useRef } from "react";
import { Box, Typography, Button, TextField, MenuItem, IconButton, Grid, Radio } from "@mui/material";
import { Add, TrashCan } from "@carbon/icons-react";
import {
  UseFormRegister,
  Control,
  UseFieldArrayRemove,
  FieldErrors,
  UseFormSetValue,
  useFieldArray,
  useWatch,
  Controller,
} from "react-hook-form";
import ImageUpload from "../../image-upload";
import { TestFormData } from "../../../types/test";
import { useQuestionDifficulty } from "../../../hooks/use-question-difficulty";
import { useSubjects } from "../../../hooks/use-subject";
import { useSubjectTopicsById } from "../../../hooks/use-subjects-topic-by-id";
import { FONT_WEIGHTS } from "../../../utils/constants/theme";

interface QuestionItemProps {
  index: number;
  control: Control<TestFormData>;
  register: UseFormRegister<TestFormData>;
  setValue: UseFormSetValue<TestFormData>;
  errors: FieldErrors<TestFormData>;
  removeQuestion: UseFieldArrayRemove;
}

const QuestionItem: FC<QuestionItemProps> = ({
  index,
  control,
  register,
  setValue,
  errors,
  removeQuestion,
}) => {
  const { questionDifficulty } = useQuestionDifficulty();
  const { subjects } = useSubjects()
  
  const selectedSubjectId = useWatch({
    control,
    name: `questionList.${index}.subjectId`,
  });

  const { subjectsTopics, isLoading: isLoadingSubtopics, refetch } = useSubjectTopicsById(
    selectedSubjectId,
    { enabled: !!selectedSubjectId }
  )

  const prevSubjectIdRef = useRef<number | undefined>(selectedSubjectId);

  useEffect(() => {
    if (
      prevSubjectIdRef.current !== undefined &&
      selectedSubjectId !== prevSubjectIdRef.current
    ) {
      setValue(`questionList.${index}.subjectTopicList`, []);
    }
    prevSubjectIdRef.current = selectedSubjectId;
    if (selectedSubjectId) {
      refetch();
    }
  }, [selectedSubjectId, setValue, refetch, index]);

  const {
    fields: alternativeFields,
    append: addAlternative,
    remove: removeAlternative,
  } = useFieldArray({
    control,
    name: `questionList.${index}.questionAlternativeList` as const,
  });

  const alternatives = useWatch({
    control,
    name: `questionList.${index}.questionAlternativeList`,
  });

  return (
    <Box sx={{ mb: 3, p: 2, borderRadius: 2, border: "1px solid #ccc" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography fontSize={16} fontWeight="bold">
          Questão {index + 1}
        </Typography>
        <Button
          variant="text"
          color="error"
          onClick={() => removeQuestion(index)}
          startIcon={<TrashCan style={{ width: 16, height: 16 }} />}
        >
          Remover Questão
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="filled"
        label="Nome da Questão"
        {...register(`questionList.${index}.name` as const)}
        error={!!errors.questionList?.[index]?.name}
        helperText={errors.questionList?.[index]?.name?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        variant="filled"
        label="Enunciado"
        {...register(`questionList.${index}.statement` as const)}
        error={!!errors.questionList?.[index]?.statement}
        helperText={errors.questionList?.[index]?.statement?.message}
        sx={{ mb: 2 }}
      />

      <Typography fontWeight={FONT_WEIGHTS.light} sx={{ mt: 2, mb: 1 }}>
        Informações da Questão
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            name={`questionList.${index}.questionDifficultyLevelId`}
            defaultValue={control._formValues?.questionList?.[index]?.questionDifficultyLevelId || ""}
            render={({ field }) => (
              <TextField
                select
                label="Nível de Dificuldade"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.questionList?.[index]?.questionDifficultyLevelId}
                helperText={errors.questionList?.[index]?.questionDifficultyLevelId?.message}
              >
                {questionDifficulty?.map((diff) => (
                  <MenuItem key={diff.id} value={diff.id}>
                    {diff.description}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            name={`questionList.${index}.subjectId`}
            defaultValue={control._formValues?.questionList?.[index]?.subjectId || ""}
            render={({ field }) => (
              <TextField
                select
                label="Matéria"
                variant="filled"
                fullWidth
                {...field}
                error={!!errors.questionList?.[index]?.subjectId}
                helperText={errors.questionList?.[index]?.subjectId?.message}
              >
                {subjects?.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            control={control}
            name={`questionList.${index}.subjectTopicList`}
            defaultValue={control._formValues?.questionList?.[index]?.subjectTopicList || []}
            render={({ field }) => (
              <TextField
                select
                label="Subtópico"
                variant="filled"
                fullWidth
                SelectProps={{ multiple: true }}
                {...field}
                error={!!errors.questionList?.[index]?.subjectTopicList}
                helperText={errors.questionList?.[index]?.subjectTopicList?.message}
              >
                {isLoadingSubtopics ? (
                  <MenuItem disabled>Carregando...</MenuItem>
                ) : (
                  subjectsTopics?.map((subtopic) => (
                    <MenuItem key={subtopic.id} value={subtopic.id}>
                      {subtopic.description}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Typography sx={{ mb: 1 }}>Imagem da Questão</Typography>
      <ImageUpload
        defaultImage={
          control._formValues?.questionList?.[index]?.statementImage &&
          control._formValues.questionList[index].statementImage !== ""
            ? control._formValues.questionList[index].statementImage
            : undefined
        }
        onImageUpload={(base64) =>
          setValue(`questionList.${index}.statementImage`, base64)
        }
      />

      <TextField
        fullWidth
        variant="filled"
        label="Legenda da Imagem"
        {...register(`questionList.${index}.statementImageLegend` as const)}
        error={!!errors.questionList?.[index]?.statementImageLegend}
        helperText={errors.questionList?.[index]?.statementImageLegend?.message}
        sx={{ mb: 2, mt: 2 }}
      />

      <TextField
        fullWidth
        variant="filled"
        label="Explicação"
        {...register(`questionList.${index}.explanation` as const)}
        sx={{ mb: 2, mt: 3 }}
      />

      <TextField
        fullWidth
        variant="filled"
        label="URL do Vídeo Explicativo"
        {...register(`questionList.${index}.videoExplanationUrl` as const)}
        sx={{ mb: 2 }}
      />

      <Typography sx={{ mt: 2, mb: 1 }}>Alternativas</Typography>
      {alternativeFields.map((alt, altIndex) => {
        const letter = String.fromCharCode(65 + altIndex);
        return (
          <Box key={alt.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              fullWidth
              variant="filled"
              label={`Alternativa ${letter}`}
              {...register(`questionList.${index}.questionAlternativeList.${altIndex}.statement` as const)}
              sx={{ mr: 2 }}
            />
            <Radio
              checked={Boolean(alternatives?.[altIndex]?.isCorrect)}
              onChange={() => {
                alternativeFields.forEach((_, i) => {
                  setValue(`questionList.${index}.questionAlternativeList.${i}.isCorrect`, i === altIndex);
                });
              }}
            />
            <IconButton color="error" onClick={() => removeAlternative(altIndex)}>
              <TrashCan />
            </IconButton>
          </Box>
        );
      })}

      <Button
        variant="text"
        startIcon={<Add />}
        onClick={() => addAlternative({ statement: "", isCorrect: false })}
        sx={{ mb: 2 }}
      >
        Adicionar Alternativa
      </Button>
    </Box>
  );
};

export default QuestionItem;
