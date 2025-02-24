import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import ErrorPage from './pages/error'
import Questionary from './pages/questionary'
import SelectionProcess from './pages/selection-process'
import Performance from './pages/performance'
import TestsPage from './pages/tests'
import TestPage from './pages/questions'
import { RegisterPage } from './pages/register'

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'questionary',
                element: <Questionary />,
            },
            {
                path: 'performance',
                element: <Performance />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'selection-process',
                children: [
                    {
                        path: 'all',
                        element: <SelectionProcess />,
                    },
                    {
                        path: 'in-progress',
                        element: <SelectionProcess />,
                    },
                    {
                        path: 'open-registration',
                        element: <SelectionProcess />,
                    },
                ],
            },
            {
                path: 'tests/:id',
                element: <TestsPage />,
            },
            {
                path: 'questions/:id',
                element: <TestPage />,
            },
            {
                path: '*',
                element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
            },
        ],
    },
])
