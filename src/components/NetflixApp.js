import React, {useState, useEffect} from 'react'
import {getRandomIntInclusive} from 'utils/helper'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'
import NetflixRow from './NetflixRow'
import {TYPE_TV, TYPE_MOVIE} from '../config'
import {clientApi} from 'utils/clientApi'

const NetflixApp = () => {
  const [headerMovie, setHeaderMovie] = useState()

  const apiKey = process.env.REACT_APP_API_KEY

  const [type] = useState([TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)])

  const tvIds = [71446, 60574, 13999, 66732]
  const moviesIds = [399566, 602734, 579047, 385128, 615658]

  const movieId = moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)]
  const tvId = tvIds[getRandomIntInclusive(0, tvIds.length - 1)]

  const defaultMovieId = type === TYPE_MOVIE ? movieId : tvId

  useEffect(() => {
    const endpoint = type + '/' + defaultMovieId
    clientApi(endpoint)
      .then(response => response.json())
      .then(data => setHeaderMovie(data))
      .catch(err => console.log(err))
  }, [apiKey, defaultMovieId, type])

  return (
    <>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      <NetflixFooter />
    </>
  )
}
export {NetflixApp}
