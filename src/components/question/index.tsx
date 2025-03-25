import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  useTheme,
  IconButton,
  Popover,
} from "@mui/material";
import { getRadioIcons } from "./radio-icons";
import { ArrowUpRight } from "@carbon/icons-react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Question as QuestionType } from "../../types/test-list";
import { base64ToFile } from "../../utils/base64-to-file";

export type QuestionProps = {
  question: QuestionType;
  index: number;
  register: any;
  selectedAnswer?: number;
  wasSubmitted?: boolean;
  onAnswerSelected?: (questionIndex: number, selectedAlternativeId: number) => void;
};

export const Question: React.FC<QuestionProps> = ({
  question,
  index,
  register,
  selectedAnswer,
  wasSubmitted,
  onAnswerSelected,
}) => {
  const theme = useTheme()

  console.log(question)
  console.log(selectedAnswer)
  console.log(wasSubmitted)
  const year = new Date(question.applicationDate).getFullYear();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (question.statementImageUrl) {
      try {
        const file = base64ToFile(question.statementImageUrl, "question-image.png");
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      } catch (error) {
        console.error("Failed to convert Base64 string to file:", error);
      }
    }
  }, [question.statementImageUrl]);

  const handleExplanationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExplanationClose = () => {
    setAnchorEl(null);
  };

  const openExplanation = Boolean(anchorEl);

  return (
    <Box sx={{ width: "100%", border: "1px solid lightgray", mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          p: 2,
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <Typography fontSize={theme.spacing(1.75)}>
          <span style={{ fontWeight: 500 }}>Ano:</span> {year}
        </Typography>
        <Typography fontSize={theme.spacing(1.75)}>
          <span style={{ fontWeight: 500 }}>Dificuldade:</span>{" "}
          {question.questionDifficultyLevel.name}
        </Typography>
        <Typography fontSize={theme.spacing(1.75)}>
          <span style={{ fontWeight: 500 }}>Categoria:</span>{" "}
          {question.subject.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Typography sx={{ fontWeight: 500, flexGrow: 1 }}>
          {question.statement}
        </Typography>
        {question.explanation && (
          <IconButton onClick={handleExplanationClick}>
            <HelpOutlineIcon />
          </IconButton>
        )}
      </Box>

      <Popover
        open={openExplanation}
        anchorEl={anchorEl}
        onClose={handleExplanationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{question.explanation}</Typography>
        </Box>
      </Popover>

      {imageUrl && (
        <Box sx={{ textAlign: "center", my: 2 }}>
          <img
            src={imageUrl}
            alt="Question Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          {question.statementImageLegend && (
            <Typography variant="caption" sx={{ mt: 1 }}>
              {question.statementImageLegend}
            </Typography>
          )}
        </Box>
      )}

      <RadioGroup sx={{ p: 2 }}>
        {question.questionAlternativeList.map((alternative) => {
          // Compara usando alternative.id
          const isSelected = alternative.id === selectedAnswer;
          const { icon, checkedIcon } = getRadioIcons(
            wasSubmitted,
            alternative.isCorrect,
            isSelected
          );
          // Registra o valor como alternative.id
          const { onChange, ...rest } = register(`responses.${index}`, {
            value: alternative.id,
          });

          return (
            <FormControlLabel
              key={alternative.id}
              control={
                <Radio
                  {...rest}
                  value={alternative.id}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  onChange={(e) => {
                    onChange(e);
                    if (onAnswerSelected) {
                      onAnswerSelected(index, alternative.id);
                    }
                  }}
                />
              }
              label={alternative.statement}
            />
          );
        })}
      </RadioGroup>

      {question.videoExplanationUrl && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button
            startIcon={<ArrowUpRight style={{ width: 16, height: 16 }} />}
            variant="text"
            onClick={() =>
              window.open(
                question.videoExplanationUrl,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Visualizar Explicação
          </Button>
        </Box>
      )}
    </Box>
  );
};
