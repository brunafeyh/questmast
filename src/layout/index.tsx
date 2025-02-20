import { FC, PropsWithChildren, ReactNode } from 'react'
import { IconButton, Stack } from '@mui/material'
import ViewContainer from './view'
import { Activity, Home, LicenseDraft, Trophy } from '@carbon/icons-react'
import { faker } from '@faker-js/faker'
import { useSetTitle } from '../hooks/use-title'
import { Popover, usePopover } from '../components/popover'
import Header from '../components/header'
import AvatarProfile from '../components/avatar-profile'
import Sidebar from '../components/sidebar'
import Profile from '../components/profile'

interface Props {
	title: string
	children: ReactNode
}

const menuItems = [
	{ text: 'HomePage', icon: <Home size={20} />, route: '/' },
	{
		text: 'Processos Seletivos',
		icon: <Trophy size={20} />,
		children: [
			{ text: 'Inscrições Abertas', route: '/selection-process/open-registration' },
			{ text: 'Em andamento', route: '/selection-process/in-progress' },
			{ text: 'Todos', route: '/selection-process/all' },
		],
	},
	{ text: 'Questionário', icon: <LicenseDraft size={20} />, route: '/questionary' },
	{ text: 'Desempenho', icon: <Activity size={20} />, route: '/performance' },
]

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	const fakeUser = {
		name: faker.person.fullName(),
	}
	const popover = usePopover()
	useSetTitle(title)
	return (
		<Stack width={'100%'} minHeight="100vh" justifyContent="space-between">
			<Header
				projectAbbreviation="QuestMast"
				projectName='Sistema de Preparação de Processos Seletivos'
				rightComponents={[
					<IconButton
						key={fakeUser.name}
						onClick={(event) => popover.current?.openPopover(event.currentTarget)}
					>
						<AvatarProfile name={fakeUser.name} />
					</IconButton>,
				]}
			/>
			<Sidebar menuItems={menuItems} />
			<ViewContainer>{children}</ViewContainer>
			<Popover ref={popover}>
				<Profile />
			</Popover>
		</Stack>
	)
}
