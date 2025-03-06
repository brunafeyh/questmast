import { FC } from "react";
import { PageLayout } from "../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectionProcessesById } from "../../hooks/selection-process/use-selection-process-by-id";
import Loading from "../../components/loading";
import PagesDetailsHeader from "../../components/page-details-header";
import { Button } from "@mui/material";
import { Async, TrashCan } from "@carbon/icons-react";
import { Modal, useModal } from "../../components/modal";
import { ConfirmationModal } from "../../components/confirmation-modal";
import { useSelectionProcessMutations } from "../../hooks/selection-process/use-selection-process-mutations";
import { useAuth } from "../../hooks/use-auth";

export const SelectionProcessDetails: FC = () => {
    const { id } = useParams();
    const { selectionProcess, isLoading } = useSelectionProcessesById(Number(id))
    const { deleteSelectionProcess } = useSelectionProcessMutations()
    const navigate = useNavigate()

    const modal = useModal()
    const { user } = useAuth()

    const handleOpenModal = () => modal.current?.openModal()
    const handleCloseModal = () => modal.current?.closeModal()

    const handleConfirmDelete = async () => {
        try{
            deleteSelectionProcess.mutateAsync({ id: Number(id), email: user?.email || '' })
            handleCloseModal()
            navigate('/selection-process')
        }
        catch(err) {
            console.log(err)
            handleCloseModal()
        }

    }
    if (isLoading) return <Loading />;
    return (
        <PageLayout title={selectionProcess?.name || ''}>
            <PagesDetailsHeader
                title={`Processo Seletivo - ${selectionProcess?.name}`}
                status={selectionProcess?.selectionProcessStatus.description}
                rightSideComponents={[
                    <Button key="outroBotao" variant="text" sx={{ color: 'red' }} onClick={handleOpenModal} startIcon={<TrashCan style={{ width: 16, height: 16 }} />}>
                        Deletar
                    </Button>,
                    <Button key="outroBotao" variant="text" onClick={() => console.log('Outro Botão Clicado')} startIcon={<Async style={{ width: 16, height: 16 }} />}>
                        Trocar status
                    </Button>,
                    <Button key="adicionarProva" variant="contained" onClick={() => console.log('Adicionar Prova')}>
                        Adicionar Prova
                    </Button>,
                ]}
            />
            <Modal ref={modal}>
                <ConfirmationModal text="Deseja realmente excluir Processo Seletivo?" onCancel={handleCloseModal} onConfirm={handleConfirmDelete} />
            </Modal>
        </PageLayout>
    )
}
