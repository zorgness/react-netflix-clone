import './App.css'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from 'ErrorFallback'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import {NetflixApp} from 'components/NetflixApp'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <NetflixApp />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
