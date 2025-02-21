import { Chip } from "@mui/material";
import { getNivelChipProps, Nivel } from "../../../utils/get-nivel-chip"

export function NivelChip({ nivel }: { nivel: Nivel }) {
    const chipProps = getNivelChipProps(nivel)
    return <Chip  {...chipProps} size="small" />
}