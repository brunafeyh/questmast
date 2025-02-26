import { Backdrop, CircularProgress } from './styles'

const Loading = () => {
	const open = true
	return (
		<Backdrop open={open}>
			<CircularProgress />
		</Backdrop>
	)
}

export default Loading
