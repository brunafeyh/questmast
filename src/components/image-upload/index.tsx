import { FC, useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Image, Upload, Close } from "@carbon/icons-react";

interface ImageUploadProps {
    onImageUpload: (base64: string) => void;
    defaultImage?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onImageUpload, defaultImage }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(defaultImage || null);
    const theme = useTheme();

    useEffect(() => {
        setImagePreview(defaultImage || null);
    }, [defaultImage]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                onImageUpload(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        onImageUpload("");
    };

    return (
        <Box
            sx={{
                border: "1px dashed #ccc",
                padding: 3,
                textAlign: "center",
                borderRadius: 2,
                position: "relative",
                backgroundColor: theme.palette.juicy.neutral.c20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {imagePreview ? (
                <>
                    <Box sx={{ position: "relative", width: "100%", textAlign: "center" }}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                width: "100%",
                                maxHeight: 200,
                                objectFit: "contain",
                                borderRadius: 4,
                            }}
                        />
                        <IconButton
                            onClick={handleRemoveImage}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                ":hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    <Button
                        startIcon={<Upload />}
                        component="label"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Trocar Imagem
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                </>
            ) : (
                <>
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                            marginBottom: 2,
                            color: theme.palette.juicy.neutral.c60,
                        }}
                    />
                    <Typography sx={{ mb: 1 }}>
                        Arraste e solte a imagem aqui ou escolha um arquivo
                    </Typography>
                    <Button startIcon={<Upload />} component="label" variant="text">
                        Faça upload
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                </>
            )}
        </Box>
    );
};

export default ImageUpload;
