import { FC, useState, SyntheticEvent } from 'react'
import { PageLayout } from '../../layout'
import PagesHeader from '../../components/pages-header'
import { Tab, Tabs } from './styles'
import { withAuthentication } from '../../hocs/auth'
import { roles } from '../../utils/auth'
import { SelectionProcessMoreViewed } from '../../components/selecion-processes-more-viewed'
import TestsMoreViewed from '../../components/tests-more-viewed'

const TITLE = 'HomePage'

const HomePage: FC = () => {
	const [value, setValue] = useState(0)

	const handleChange = (_: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<PageLayout title={TITLE}>
			<PagesHeader title={TITLE} />
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{ mb: 2 }}
			>
				<Tab label="Concursos Mais Procurados" />
				<Tab label="Provas mais Procuradas" />
			</Tabs>

			{value === 0 &&
				<SelectionProcessMoreViewed />}
			{value === 1 &&
				<TestsMoreViewed />
			}
		</PageLayout>
	)
}

export default withAuthentication(HomePage, roles)