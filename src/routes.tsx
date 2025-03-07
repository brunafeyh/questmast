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
import { SelectionProcessDetails } from './pages/selection-process-details'
import VerificationPage from './pages/register-verification'
import RecoverPasswordPage from './pages/recover-password'
import ResetPasswordPage from './pages/reset-password'
import AddTest from './pages/add-test'

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
                path: 'add-test/:id',
                element: <AddTest />,
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
                path: 'register-content-moderator',
                element: <RegisterPage />,
            },
            {
                path: 'register-verification/:data',
                element: <VerificationPage />,
            },
            {
                path: 'reset-password/:data',
                element: <ResetPasswordPage />,
            },
            {
                path: 'selection-process',
                element: <SelectionProcess />
            },
            {
                path: 'recover-password',
                element: <RecoverPasswordPage />
            },
            {
                path: 'selection-process/details/:id',
                element: <SelectionProcessDetails />,
            },
            {
                path: 'tests/:id',
                element: <TestsPage />,
            },
            {
                path: 'details-test/:id',
                element: <TestPage />,
            },
            {
                path: '*',
                element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
            },
        ],
    },
])
