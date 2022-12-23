import './App.css'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from 'ErrorFallback'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import {NetflixApp} from 'components/NetflixApp'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {NetflixMovies} from 'components/NetflixMovies'
import {NetflixSeries} from 'components/NetflixSeries'
import {NetflixNews} from 'components/NetflixNews'

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
        <Router>
          <Routes>
            <Route exact path="/" element={<NetflixApp />} />
            <Route exact path="/movies" element={<NetflixMovies />} />
            <Route exact path="/series" element={<NetflixSeries />} />
            <Route exact path="/news" element={<NetflixNews />} />
          </Routes>
        </Router>
        <NetflixApp />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
