import * as React from 'react'
import './mocks'
import * as authNetflix from './utils/authNetflixProvider'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {AuthApp} from 'AuthApp'
import {UnauthApp} from 'UnauthApp'
import {clientAuth} from './utils/clientApi'
import {useFetchData} from './utils/hooks'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import 'App.css'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

async function getUserByToken() {
  let user = null
  const token = await authNetflix.getToken()
  if (token) {
    const data = await clientAuth('me', {token})
    user = data.data.user
  }
  return user
}

function App() {
  const {data: authUser, execute, status, setData} = useFetchData()
  React.useEffect(() => {
    execute(getUserByToken())
  }, [execute])

  const [authError, setAuthError] = React.useState()
  const login = data =>
    authNetflix
      .login(data)
      .then(user => setData(user))
      .catch(err => setAuthError(err))
  const register = data =>
    authNetflix
      .register(data)
      .then(user => setData(user))
      .catch(err => setAuthError(err))
  const logout = () => {
    authNetflix.logout()
    setData(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {status === 'fetching' ? (
          <Backdrop open={true}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : authUser ? (
          <AuthApp logout={logout} />
        ) : (
          <UnauthApp login={login} register={register} error={authError} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
