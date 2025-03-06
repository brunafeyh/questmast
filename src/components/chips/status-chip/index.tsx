import { Chip } from "@mui/material"
import { getStatusColor } from "../../../utils/get-status-color"

export function StatusChip({ status, header }: { status: string, header?: boolean}) {
	const { label, color, sx } = getStatusColor(status)
	return (
	  <Chip
		label={label}
		color={color as any}
		size="small"
		sx={{
		  ...sx,
		  ml: header ? 2 : 0,
		  fontWeight: 500,
		  borderRadius: '12px',
		}}
	  />
	)
  }