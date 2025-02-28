import { FC } from "react";
import { PageLayout } from "../../layout";
import { useParams } from "react-router-dom";
import { useSelectionProcessesById } from "../../hooks/selection-process/use-selection-process-by-id";
import Loading from "../../components/loading";
import PagesDetailsHeader from "../../components/page-details-header";
import { Button } from "@mui/material";

export const SelectionProcessDetails: FC = () => {
    const { id } = useParams()
    const { selectionProcess, isLoading } = useSelectionProcessesById(Number(id))
    if (isLoading) return <Loading />
    return (
        <PageLayout title="s">
            <PagesDetailsHeader title={`Processo Seletivo - ${selectionProcess?.name}`} rightSideComponent={[
                <Button variant="contained" onClick={() => console.log('jkj')}>
                    Adicionar Prova
                </Button>
            ]}/>
        </PageLayout>
    )
}