import React, {useState, useEffect} from 'react'
import {getRandomIntInclusive} from 'utils/helper'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'
import NetflixRow from './NetflixRow'
import {TYPE_TV, TYPE_MOVIE} from '../config'
import {clientApi} from 'utils/clientApi'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {makeStyles} from '@mui/styles'

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
  const [headerMovie, setHeaderMovie] = useState()

  const apiKey = process.env.REACT_APP_API_KEY

  const [type] = useState([TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)])

  const tvIds = [71446, 60574, 13999, 66732]
  const moviesIds = [399566, 602734, 579047, 385128, 615658]

  const movieId = moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)]
  const tvId = tvIds[getRandomIntInclusive(0, tvIds.length - 1)]

  const defaultMovieId = type === TYPE_MOVIE ? movieId : tvId

  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const endpoint = type + '/' + defaultMovieId
    setStatus('fetching')
    clientApi(endpoint)
      .then(response => response.json())
      .then(data => {
        setHeaderMovie(data)
        setStatus('done')
      })
      .catch(err => {
        console.log(err)
        setStatus('error')
      })
  }, [apiKey, defaultMovieId, type])

  return (
    <>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      {status === 'error' ?? (
        <div className="alert">
          <Alert severity="error" />
        </div>
      )}
      {status === 'fetching' ?? (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
      <NetflixFooter />
    </>
  )
}
export {NetflixApp}
