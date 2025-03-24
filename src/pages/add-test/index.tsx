import { PageLayout } from "../../layout";
import { FC } from "react";
import AddTestForm from "../../components/forms/add-test";
import PagesDetailsHeader from "../../components/page-details-header";
import { Button } from "@mui/material";
import { Bot } from "@carbon/icons-react";
import { useNavigate, useParams } from "react-router-dom";

const AddTest: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <PageLayout title="Adicionar Prova">
            <PagesDetailsHeader title="Adicionar Prova" rightSideComponents={[
                <Button variant="text" startIcon={<Bot />} onClick={() => navigate(`/create-test-ia/${id}`)}>
                    Criar Prova usando Inteligência Artificial
                </Button>]}
            />
            <AddTestForm />
        </PageLayout>
    )
}

export default AddTest