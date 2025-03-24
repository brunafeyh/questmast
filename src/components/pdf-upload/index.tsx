import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    Typography,
    IconButton,
    Modal,
    useTheme,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download'
import { Document } from '@carbon/icons-react'

type CustomPDFInputProps = {
    onFileChange?: (file: File | null) => void
    initialFile?: File | null
}

const CustomPDFInput: React.FC<CustomPDFInputProps> = ({
    onFileChange,
    initialFile = null,
}) => {
    const theme = useTheme()
    const [file, setFile] = useState<File | null>(initialFile)
    const [openModal, setOpenModal] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setFile(initialFile)
    }, [initialFile])

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile.type === 'application/pdf') {
                setFile(droppedFile)
                onFileChange?.(droppedFile)
            }
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile)
            onFileChange?.(selectedFile)
        }
    }

    const handlePreview = () => {
        setOpenModal(true)
    }

    const handleRemoveFile = () => {
        setFile(null)
        onFileChange?.(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleDownloadFile = () => {
        if (!file) return
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Box>
            {!file ? (
                <Box
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s',
                        ...(isDragOver && {
                            backgroundColor: '#f0f0f0',
                            borderColor: '#999',
                        }),
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                     <Document style={{width: 32, height: 32, color: theme.palette.juicy.neutral.c60}}/>
                    <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
                        Arraste e solte o arquivo aqui ou <u>escolha um arquivo</u>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                        Formatos suportados: PDF
                    </Typography>

                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        borderRadius: 2,
                        p: 2,
                        gap: 2,
                    }}
                >
                    <Document style={{width: 48, height: 24, color: theme.palette.juicy.neutral.c60}}/>

                    <Box sx={{ flex: 1 }} >
                        <Typography  sx={{ fontWeight: 500, fontSize: 14 }}>
                            {file.name}
                        </Typography>
                        <Typography sx={{ color: '#666',  fontSize: 12  }}>
                            {(file.size / 1024).toFixed(1)} KB
                        </Typography>
                    </Box>

                    <IconButton onClick={handlePreview}>
                        <VisibilityIcon sx={{ color: theme.palette.juicy.primary.c70, height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton onClick={handleDownloadFile}>
                        <DownloadIcon sx={{ color: theme.palette.juicy.primary.c70, height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton onClick={handleRemoveFile}>
                        <CloseIcon sx={{ color: theme.palette.juicy.primary.c70, height: 20, width: 20 }}/>
                    </IconButton>
                </Box>
            )}

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80vw',
                        height: '80vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                    }}
                >
                    {file && (
                        <iframe
                            src={URL.createObjectURL(file)}
                            title="Visualização do PDF"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    )}
                </Box>
            </Modal>
        </Box>
    )
}

export default CustomPDFInput
