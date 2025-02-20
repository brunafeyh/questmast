import { FC } from 'react'
import { Search } from '@carbon/icons-react'
import { Autocomplete, Box, InputAdornment, MenuItem } from '@mui/material'
import { Filter } from '../../../types/filter'
import { TextField } from '../styles'

type FilterInputProps = {
	filterType: Filter
	options?: { label: string; value: any }[] | null
	value: any
	onChange: (value: string | number) => void
}

const FilterTextField: FC<FilterInputProps> = ({ filterType, options, value, onChange }) => {
	if (filterType === 'text' || filterType === 'unknown') {
		return (
			<TextField
				label="Pesquisar"
				variant="filled"
				size="small"
				value={value || ''}
				onChange={(e) => onChange(e.target.value)}
				fullWidth
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Search style={{ width: 14, height: 14 }} />
							</InputAdornment>
						),
					},
				}}
			/>
		)
	}
	if (filterType === 'number') {
		return (
			<TextField
				label="Número"
				variant="filled"
				size="small"
				type="number"
				value={value || ''}
				onChange={(e) => onChange(e.target.value)}
				fullWidth
			/>
		)
	}

	const selectedOption = options?.find((opt) => opt.value === value) || undefined

	return (
		<Box width="100%">
			<Autocomplete
				options={options || []}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, val) => option.value === val.value}
				value={selectedOption}
				onChange={(_, newValue) => onChange(newValue ? newValue.value : '')}
				renderInput={(params) => (
					<TextField {...params} label="Selecione" variant="filled" size="small" fullWidth />
				)}
				renderOption={(props, option) => (
					<MenuItem {...props} key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				)}
				sx={(theme) => ({ width: '100%', minWidth: theme.spacing(28.75) })}
			/>
		</Box>
	)
}

export default FilterTextField
