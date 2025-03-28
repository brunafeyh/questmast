import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import ErrorPage from './pages/error'
import Questionary from './pages/questionary'
import Performance from './pages/performance'
import TestPage from './pages/test'
import { RegisterPage } from './pages/register'
import LoginPage from './pages/login'
import { SelectionProcess } from './pages/selection-process'
import { SelectionProcessDetails } from './pages/selection-process-details'
import VerificationPage from './pages/register-verification'
import RecoverPasswordPage from './pages/recover-password'
import ResetPasswordPage from './pages/reset-password'
import AddTest from './pages/add-test'
import EditTest from './pages/edit-test'
import AddTestIA from './pages/add-test-ia'
import { QuestionaryRespond } from './pages/questionnary-respond'

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
                path: 'questionary/respond',
                element: <QuestionaryRespond />,
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
                path: 'edit-test/:id',
                element: <EditTest />,
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
                path: 'details-test/:id',
                element: <TestPage />,
            },
            {
                path: 'create-test-ia/:id',
                element: <AddTestIA />,
            },
            {
                path: '*',
                element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
            },
        ],
    },
])
