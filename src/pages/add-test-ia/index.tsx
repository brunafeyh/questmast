import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import CustomPDFInput from '../../components/pdf-upload'
import { PageLayout } from '../../layout'
import PagesDetailsHeader from '../../components/page-details-header'
import AddTestForm from '../../components/forms/add-test'
import { useSelectionProcessTestMutations } from '../../hooks/selection-process-test/use-selection-process-test-mutations'
import Loading from '../../components/loading'
import { Test } from '../../types/test-list'

const AddTestIA = () => {
    const [file, setFile] = useState<File | null>(null)
    const [test, setTest] = useState<Test>()

    console.log(test)

    const { createSelectionProcessTestIA } = useSelectionProcessTestMutations()

    const handleFileChange = (selectedFile: File | null) => {
        setFile(selectedFile)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!file) {
            console.error("Nenhum arquivo selecionado")
            return
        }
        try {
            const response = await createSelectionProcessTestIA.mutateAsync(file)
            setTest(response)
        } catch (err) {
            console.log(err)
        }
    }

    if (createSelectionProcessTestIA.isPending) return <Loading />

    return (
        <PageLayout title="Adicionar Teste com IA">
            <PagesDetailsHeader title="Adicionar Teste com IA" />
            {!test ? (
                <Box component="form" onSubmit={handleSubmit}>
                    <CustomPDFInput onFileChange={handleFileChange} initialFile={file} />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Enviar
                    </Button>
                </Box>
            ) : (
                <AddTestForm defaultTest={test} />
            )}
        </PageLayout>
    )
}

export default AddTestIA
