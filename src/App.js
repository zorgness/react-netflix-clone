import * as React from 'react'
import './mocks'
import {useAuth} from './context/AuthContext'
import {AppProviders} from './context'
import LoadingFullScreen from './components/LoadingFullScreen'
import 'App.css'
const UnauthApp = React.lazy(() => import('./UnauthApp'))
const AuthApp = React.lazy(() => import('./AuthApp'))

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  const {authUser} = useAuth()
  return (
    <React.Suspense fallback={<LoadingFullScreen />}>
      {authUser ? <AuthApp /> : <UnauthApp />}
    </React.Suspense>
  )
}

export {App}
