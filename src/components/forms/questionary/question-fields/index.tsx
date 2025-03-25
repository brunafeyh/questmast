import React from "react";
import { Box, TextField, MenuItem, IconButton } from "@mui/material";
import { useWatch, useFormContext, Controller } from "react-hook-form";
import { useSubjects } from "../../../../hooks/use-subject";
import { useQuestionDifficulty } from "../../../../hooks/use-question-difficulty";
import { useSubjectTopicsById } from "../../../../hooks/use-subjects-topic-by-id";
import { TrashCan } from "@carbon/icons-react";

type Props = {
  index: number;
  removeQuestion: (index: number) => void;
};

export const QuestionField: React.FC<Props> = ({ index, removeQuestion }) => {
  const { control, register } = useFormContext();
  const { subjects } = useSubjects();
  const { questionDifficulty } = useQuestionDifficulty();

  const selectedSubjectId = useWatch({
    control,
    name: `questionnaireQuestionFormDTOList.${index}.subjectId`,
  });

  const { subjectsTopics, isLoading } = useSubjectTopicsById(selectedSubjectId, {
    enabled: !!selectedSubjectId,
  });

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      gap={2}
    >
      <Box sx={{ flex: 1, minWidth: 180 }}>
        <TextField
          label="Disciplina"
          select
          variant="filled"
          {...register(`questionnaireQuestionFormDTOList.${index}.subjectId`, {
            valueAsNumber: true,
          })}
          fullWidth
        >
          {subjects?.map((subject: any) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ flex: 1, minWidth: 180 }}>
        <Controller
          name={`questionnaireQuestionFormDTOList.${index}.subjectTopicIds` as const}
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TextField
              label="Tópico"
              select
              variant="filled"
              SelectProps={{ multiple: true }}
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              fullWidth
            >
              {isLoading ? (
                <MenuItem disabled>Carregando...</MenuItem>
              ) : (
                subjectsTopics?.map((topic: any) => (
                  <MenuItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />
      </Box>

      <Box sx={{ width: 120 }}>
        <TextField
          label="Qtd"
          type="number"
          variant="filled"
          {...register(`questionnaireQuestionFormDTOList.${index}.quantity`, {
            valueAsNumber: true,
          })}
          fullWidth
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 180 }}>
        <Controller
          name={`questionnaireQuestionFormDTOList.${index}.questionDifficultyLevelIds` as const}
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TextField
              label="Dificuldade"
              select
              variant="filled"
              SelectProps={{ multiple: true }}
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              fullWidth
            >
              {questionDifficulty?.map((level: any) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton
          color="error"
          onClick={() => removeQuestion(index)}
          sx={{ mt: 1 }}
        >
          <TrashCan width={24} height={24} />
        </IconButton>
      </Box>
    </Box>
  );
};
