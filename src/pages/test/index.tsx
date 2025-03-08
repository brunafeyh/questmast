import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { PageLayout } from "../../layout";
import { Question } from "../../components/question";
import PagesDetailsHeader from "../../components/page-details-header";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import { useAuth } from "../../hooks/use-auth";
import { Edit, TrashCan } from "@carbon/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, useModal } from "../../components/modal";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { useSelectionProcessTestMutations } from "../../hooks/selection-process-test/use-selection-process-test-mutations";
import Loading from "../../components/loading";
import { useSelectionProcessesTestById } from "../../hooks/selection-process-test/use-selection-process-test-by-id";

type FormData = {
  responses: number[];
};

const TestPage: FC = () => {
  const theme = useTheme();
  const { isStudante, isAuthenticated, user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectionProcessTest } = useSelectionProcessesTestById(Number(id));
  const { deleteSelectionProcessTest } = useSelectionProcessTestMutations();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      responses: selectionProcessTest
        ? selectionProcessTest.questionList.map(() => -1)
        : [],
    },
  });

  const deleteModal = useModal();

  useEffect(() => {
    if (selectionProcessTest) {
      reset({ responses: selectionProcessTest.questionList.map(() => -1) });
    }
  }, [selectionProcessTest, reset]);

  if (!selectionProcessTest) return <Loading />;

  const onSubmit = (data: FormData) => {
    let correctCount = 0;
    data.responses.forEach((response, index) => {
      const correctIndex = selectionProcessTest.questionList[index].questionAlternativeList.findIndex(
        (alt) => alt.isCorrect
      );
      if (response === correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setWasSubmitted(true);
  };

  const handleOpenDeleteModal = () => deleteModal.current?.openModal();
  const handleCloseDeleteModal = () => deleteModal.current?.closeModal();
  const selectedResponses = watch("responses");

  const handleDelete = async () => {
    try {
      await deleteSelectionProcessTest.mutateAsync({ id: Number(id), email: email || "" });
      navigate("/selection-process");
    } catch (err) {
      handleCloseDeleteModal();
      console.log(err);
    }
  };

  if (deleteSelectionProcessTest.isPending) return <Loading />;

  return (
    <PageLayout title="Test">
      <Box
        sx={{
          maxHeight: "80vh",
          "&::-webkit-scrollbar": {
            width: theme.spacing(1),
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.grey[300],
            borderRadius: theme.spacing(0.5),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[500],
            borderRadius: theme.spacing(0.5),
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.grey[600],
          },
        }}
      >
        <PagesDetailsHeader
          title={`Test - ${selectionProcessTest?.name}`}
          rightSideComponents={
            isStudante || !isAuthenticated
              ? undefined
              : [
                  <Button
                    key="editTest"
                    variant="text"
                    onClick={() => navigate(`/edit-test/${id}`)}
                    startIcon={<Edit style={{ width: 16, height: 16 }} />}
                  >
                    Editar
                  </Button>,
                  <Button
                    key="deleteTest"
                    sx={{ color: theme.palette.juicy.error.c50 }}
                    variant="text"
                    onClick={handleOpenDeleteModal}
                    startIcon={<TrashCan style={{ width: 16, height: 16 }} />}
                  >
                    Deletar Prova
                  </Button>,
                ]
          }
        />

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} mb={2} mr={2}>
          <Box sx={{ flexDirection: "column" }}>
            <Typography>Data de aplicação</Typography>
            <Typography fontWeight={FONT_WEIGHTS.light} sx={{ mb: 2 }}>
              {selectionProcessTest.applicationDate}
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column" }}>
            <Typography>Cargo</Typography>
            <Typography fontWeight={FONT_WEIGHTS.light}>
              {selectionProcessTest.function.name}
            </Typography>
            <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light}>
              {selectionProcessTest.function.description}
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column" }}>
            <Typography>Nível Institucional</Typography>
            <Typography fontWeight={FONT_WEIGHTS.light}>
              {selectionProcessTest.professionalLevel.name}
            </Typography>
            <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light}>
              {selectionProcessTest.professionalLevel.description}
            </Typography>
          </Box>
        </Box>

        {wasSubmitted && score !== null && (
          <Chip
            sx={{ mb: 2 }}
            label={`You answered ${score} out of ${selectionProcessTest.questionList.length} questions correctly.`}
            color="primary"
            variant="outlined"
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {selectionProcessTest.questionList.map((question, i) => {
            const userAnswer = selectedResponses[i];
            return (
              <Question
                key={question.id}
                question={question}
                index={i}
                register={register}
                selectedAnswer={userAnswer}
                wasSubmitted={wasSubmitted}
              />
            );
          })}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" type="button" onClick={() => console.log("Cancel")}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Concluir
            </Button>
          </Box>
        </form>
      </Box>

      <Modal ref={deleteModal}>
        <ConfirmationModal
          text="Você tem cereteza que deseja excluir a prova?"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />
      </Modal>
    </PageLayout>
  );
};

export default TestPage;
