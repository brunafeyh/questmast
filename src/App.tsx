import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/query-client'
import { theme } from './themes'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="bottom-center" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
