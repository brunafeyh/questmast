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
import SelectionProcessForm from "../../components/forms/editandadd-selection-process";
import { UpdateStatusForm } from "../../components/forms/status";
import { useTestsById } from "../../hooks/selection-process-test/use-test-by-id";
import { useFunctions } from "../../hooks/use-functions-";
import { ColumnDef } from "@tanstack/react-table";
import { YearOptions } from "../../utils/constants/year";
import { usePaginateArray } from "../../hooks/use-paginate-array";
import { transformTests } from "../../utils/selection-process-summary";
import Table from "../../components/table";
import { TableCellBody, TableRowBody } from "../../components/table/styles";
import { getYearFromDate } from "../../utils/get-year";

export const SelectionProcessDetails: FC = () => {
    const { id } = useParams()
    const theme = useTheme()
    const { selectionProcess, isLoading, error} = useSelectionProcessesById(Number(id))

    const { tests, isLoading: isLoadingTests } = useTestsById(Number(id))

    const { deleteSelectionProcess } = useSelectionProcessMutations()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const navigate = useNavigate()

    const modal = useModal()

    const editModal = useModal()
    const { user, isStudante, isModerator } = useAuth()

    const doestNotHaveAccess = isModerator && selectionProcess?.contentModerator.mainEmail !== user?.email

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

    const editStatusModal = useModal()

    const handleOpenEditStatusModal = () => editStatusModal.current?.openModal()

    const handleCloseEditStatusModal = () => editStatusModal.current?.closeModal()

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

    const { functions } = useFunctions()

    const functionsOptions = functions?.map(s => ({
        value: s.name,
        label: s.name
    })) || []

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: 'title',
            header: 'Título',
        },
        {
            accessorKey: 'functions',
            header: 'Cargo',
            meta: { filterVariant: 'list', options: functionsOptions }
        },
        {
            accessorKey: 'year',
            header: 'Ano',
            meta: { filterVariant: 'enum', options: YearOptions }
        },

    ]

    const data = tests ? transformTests(tests) : []

    const paginatedData = usePaginateArray(data || [])

    if (isLoading || isLoadingTests) return <Loading />

    return (
        <PageLayout title={selectionProcess?.name || ''}>
            <PagesDetailsHeader
                title={`Processo Seletivo - ${selectionProcess?.name}`}
                status={selectionProcess?.selectionProcessStatus.description}
                rightSideComponents={isStudante || doestNotHaveAccess ? undefined : [
                    <Button key="outroBotao" variant="text" onClick={handleOpenEditStatusModal} startIcon={<Async style={{ width: 16, height: 16 }} />}>
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
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} mr={2} mb={2}>
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
                        {getYearFromDate(selectionProcess?.openingDate || '')}
                    </Typography>
                </Box>
            </Box>
            <Table
                columns={columns}
                data={paginatedData}
                totalRows={data?.length || 0}
                isLoading={isLoading}
                error={error}
                renderData={(row) =>

                    <TableRowBody
                        key={row.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate(`/details-test/${row.original.idTest}`);
                        }}
                    >
                        <TableCellBody>{row.original.title}</TableCellBody>
                        <TableCellBody>{row.original.function}</TableCellBody>
                        <TableCellBody>{row.original.year}</TableCellBody>
                    </TableRowBody>}

            />
            <Modal ref={editModal}>
                <SelectionProcessForm handleCloseModal={handleCloseEditModal} id={Number(id)} selectionProcess={selectionProcess} />
            </Modal>
            <Modal ref={modal}>
                <ConfirmationModal text="Deseja realmente excluir Processo Seletivo?" onCancel={handleCloseModal} onConfirm={handleConfirmDelete} />
            </Modal>
            <Modal ref={editStatusModal}>
                <UpdateStatusForm id={Number(id)} handleClose={handleCloseEditStatusModal} />
            </Modal>
        </PageLayout >
    )
}
