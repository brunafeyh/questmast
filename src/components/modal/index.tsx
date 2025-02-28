import {
	ForwardRefRenderFunction,
	ReactNode,
	RefObject,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { ModalProps, Modal as MuiModal } from '@mui/material'

import { BoxModal } from './styles'

interface Props extends Omit<ModalProps, 'children' | 'open'> {
	children: ReactNode
}

export interface ModalOptions {
	openModal: () => void
	closeModal: () => void
}

const ModalComponent: ForwardRefRenderFunction<ModalOptions, Props> = ({ children, ...otherProps }, ref) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const openModal = useCallback(() => {
		setIsOpened(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsOpened(false)
	}, [])

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
	}))

	return (
		<MuiModal open={isOpened} onClose={closeModal} {...otherProps}>
			<BoxModal display="flex" justifyContent="center" alignItems="center">
				{children}
			</BoxModal>
		</MuiModal>
	)
}

export const closeModal = (modal: RefObject<ModalOptions>) => modal.current?.closeModal()
export const openModal = (modal: RefObject<ModalOptions>) => modal.current?.openModal()

export const useModal = () => useRef<ModalOptions>(null)

export const Modal = forwardRef(ModalComponent)
