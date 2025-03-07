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

export type QuestionType = {
  id: number;
  applicationDate: string;
  name: string;
  statementImageUrl?: string;
  statement: string;
  quantityOfCorrectAnswers: number;
  quantityOfWrongAnswers: number;
  quantityOfTries: number;
  explanation: string;
  videoExplanationUrl?: string;
  questionAlternativeList: {
    id: number;
    statement: string;
    isCorrect: boolean;
  }[];
  questionDifficultyLevel: {
    id: number;
    name: string;
    description: string;
  };
  subject: {
    id: number;
    name: string;
    description: string;
  };
  subjectTopicList: {
    id: number;
    name: string;
    description: string;
    subject: {
      id: number;
      name: string;
      description: string;
    };
  }[];
};

export type QuestionProps = {
  question: QuestionType;
  index: number;
  register: any;
  selectedAnswer?: number;
  wasSubmitted?: boolean;
};

function base64ToFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid dataURL");
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const Question: React.FC<QuestionProps> = ({
  question,
  index,
  register,
  selectedAnswer,
  wasSubmitted,
}) => {
  const theme = useTheme();
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

      {/* Se houver explicação, exibe o IconButton com o ícone de "?" */}
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
        </Box>
      )}

      <RadioGroup sx={{ p: 2 }}>
        {question.questionAlternativeList.map((alternative, altIndex) => {
          const isCorrect = alternative.isCorrect;
          const isSelected = altIndex === Number(selectedAnswer);
          const { icon, checkedIcon } = getRadioIcons(
            wasSubmitted,
            isCorrect,
            isSelected
          );

          return (
            <FormControlLabel
              key={alternative.id}
              control={
                <Radio
                  {...register(`responses.${index}`, { value: altIndex })}
                  value={altIndex}
                  icon={icon}
                  checkedIcon={checkedIcon}
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
  )
}