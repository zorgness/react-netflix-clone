import React, {useState, useEffect} from 'react'
import {getRandomType, getRandomId} from 'utils/helper'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'
import NetflixRow from './NetflixRow'
import {clientApi} from 'utils/clientApi'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {makeStyles} from '@mui/styles'
import {useFetchData} from 'utils/hooks'

const useStyles = makeStyles({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
})

const NetflixApp = () => {
  const [type] = useState(getRandomType())

  const defaultMovieId = getRandomId(type)

  const {data: headerMovie, status, error, execute} = useFetchData()

  useEffect(() => {
    execute(clientApi(`${type}/${defaultMovieId}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'error') {
    throw new Error(error.message)
  }

  return (
    <>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      {status === 'error' ? (
        <div className="alert">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        </div>
      ) : null}
      {status === 'fetching' ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : null}
      <NetflixFooter />
    </>
  )
}
export {NetflixApp}
