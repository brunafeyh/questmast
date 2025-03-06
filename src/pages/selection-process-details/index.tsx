import { FC, useState } from "react";
import { PageLayout } from "../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectionProcessesById } from "../../hooks/selection-process/use-selection-process-by-id";
import Loading from "../../components/loading";
import PagesDetailsHeader from "../../components/page-details-header";
import { Box, Button, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { Add, Async, Edit, OverflowMenuVertical, TrashCan } from "@carbon/icons-react";
import { Modal, useModal } from "../../components/modal";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { useSelectionProcessMutations } from "../../hooks/selection-process/use-selection-process-mutations";
import { useAuth } from "../../hooks/use-auth";
import { FONT_WEIGHTS } from "../../utils/constants/theme";
import SelectionProcessForm from "../../components/forms/add/edit-selection-process";

export const SelectionProcessDetails: FC = () => {
    const { id } = useParams()
    const theme = useTheme()
    const { selectionProcess, isLoading, error } = useSelectionProcessesById(Number(id))

    const { deleteSelectionProcess } = useSelectionProcessMutations()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const navigate = useNavigate()

    const modal = useModal()

    const editModal = useModal()
    const { user } = useAuth()

    const isStudante = user?.role === 'ROLE_STUDENT'

    const isModerator = user?.role === 'ROLE_CONTENT_MODERATOR'

    const doestNotHaveAccess = isModerator && selectionProcess?.contentModerator.mainEmail !== user.email

    const handleOpenModal = () => {
        handleMenuClose()
        modal.current?.openModal()
    }
    const handleCloseModal = () => modal.current?.closeModal()
    const handleOpenEditModal = () => {
        handleMenuClose()
        editModal.current?.openModal()
    }

    const handleCloseEditModal = () => editModal.current?.closeModal()

    const handleConfirmDelete = async () => {
        try {
            await deleteSelectionProcess.mutateAsync({ id: Number(id), email: user?.email || '' })
            handleCloseModal()
            navigate('/selection-process')
        }
        catch (err) {
            console.log(err)
            handleCloseModal()
        }

    }
    if (isLoading) return <Loading />

    if (error || !selectionProcess) return <Typography>jkjkj</Typography>
    return (
        <PageLayout title={selectionProcess?.name || ''}>
            <PagesDetailsHeader
                title={`Processo Seletivo - ${selectionProcess?.name}`}
                status={selectionProcess?.selectionProcessStatus.description}
                rightSideComponents={isStudante || doestNotHaveAccess ? undefined : [
                    <Button key="outroBotao" variant="text" onClick={() => console.log('Outro Botão Clicado')} startIcon={<Async style={{ width: 16, height: 16 }} />}>
                        Trocar status
                    </Button>,
                    <Button key="adicionarProva" variant="contained" onClick={() => navigate(`/add-test/${id}`)} startIcon={<Add style={{ width: 16, height: 16 }} />}>
                        Adicionar Prova
                    </Button>,
                    <IconButton key="menu" onClick={handleMenuOpen} sx={{ color: theme.palette.juicy.primary.c70 }}>
                        <OverflowMenuVertical />
                    </IconButton>,
                ]}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleOpenModal} sx={{ color: theme.palette.juicy.error.c50 }}>
                    <TrashCan style={{ width: 16, height: 16, marginRight: 8 }} />
                    Deletar
                </MenuItem>
                <MenuItem onClick={handleOpenEditModal} sx={{ color: theme.palette.juicy.primary.c60 }}>
                    <Edit style={{ width: 16, height: 16, marginRight: 8 }} />
                    Editar
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} mr={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography >Título</Typography>
                    <Typography fontWeight={FONT_WEIGHTS.light} sx={{ mb: 2 }}>
                        {selectionProcess?.name}
                    </Typography>

                    <Typography >Status</Typography>
                    <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light} >
                        {selectionProcess?.selectionProcessStatus.description}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography >Instituição</Typography>
                    <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light} >
                        {selectionProcess?.institution.name}
                    </Typography>

                    <Typography >Banca</Typography>
                    <Typography sx={{ mb: 2 }} fontWeight={FONT_WEIGHTS.light} >
                        {selectionProcess?.boardExaminer.name}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography> Ano</Typography>
                    <Typography fontWeight={FONT_WEIGHTS.light} >
                        {selectionProcess?.openingDate}
                    </Typography>
                </Box>
            </Box>
            <Modal ref={editModal}>
                <SelectionProcessForm handleCloseModal={handleCloseEditModal} id={Number(id)} />
            </Modal>
            <Modal ref={modal}>
                <ConfirmationModal text="Deseja realmente excluir Processo Seletivo?" onCancel={handleCloseModal} onConfirm={handleConfirmDelete} />
            </Modal>
        </PageLayout >
    )
}
