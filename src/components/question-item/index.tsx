import { FC } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Add, TrashCan } from "@carbon/icons-react";
import {
  UseFormRegister,
  Control,
  UseFieldArrayRemove,
  FieldErrors,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import ImageUpload from "../../components/image-upload";
import { AddTestFormData } from "../../types/test";

interface QuestionItemProps {
  index: number;
  control: Control<AddTestFormData>;
  register: UseFormRegister<AddTestFormData>;
  setValue: UseFormSetValue<AddTestFormData>;
  errors: FieldErrors<AddTestFormData>;
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
  const { fields: alternativeFields, append: addAlternative, remove: removeAlternative } =
    useFieldArray({
      control,
      name: `questionList.${index}.questionAlternativeList` as const,
    });

  return (
    <Box sx={{ mb: 3, p: 2, borderRadius: 2, border: "1px solid #ccc"}}>
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
        <Button variant="text" color="error" onClick={() => removeQuestion(index)} startIcon = {<TrashCan style={{width: 16, height: 16}}/>}>
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

      <Typography sx={{ mb: 1 }}>Imagem da Questão</Typography>
      <ImageUpload onImageUpload={(base64) => setValue(`questionList.${index}.statementImage`, base64)} />

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
