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
import {TYPE_MOVIE, TYPE_TV} from 'config'

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

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter={'trending'}
        title="Films Netflix"
      />

      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter={'trending'}
        title="Série Netflix"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter={'toprated'}
        title="Les mieux notés"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        param={10759}
        filter="genre"
        title="Action & aventure"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        param={53}
        filter="genre"
        title="Les meilleurs Thrillers"
      />
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
