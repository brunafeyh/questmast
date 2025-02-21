import { Chip } from "@mui/material"
import { getStatusColor } from "../../../utils/get-status-color"

export function StatusChip({ status }: { status: string }) {
	const { label, color, sx } = getStatusColor(status)
	return (
	  <Chip
		label={label}
		color={color as any}
		size="small"
		sx={{
		  ...sx,
		  fontWeight: 500,
		  borderRadius: '12px',
		}}
	  />
	)
  }