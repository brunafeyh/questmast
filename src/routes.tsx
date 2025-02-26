import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import ErrorPage from './pages/error'
import Questionary from './pages/questionary'
import Performance from './pages/performance'
import TestsPage from './pages/tests'
import TestPage from './pages/test'
import { RegisterPage } from './pages/register'
import LoginPage from './pages/login'
import { SelectionProcess } from './pages/selection-process'
import AddSelectionProcess from './pages/add-seletion-process'

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
                path: 'add-selection-process',
                element: <AddSelectionProcess />,
            },
            {
                path: 'login',
                element: <LoginPage />,
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
