import React, {useState, useEffect} from 'react'
import {getRandomIntInclusive} from 'utils/helper'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'
import NetflixRow from './NetflixRow'

const NetflixApp = () => {
  const defaultMovieId = 399566

  const [headerMovie, setHeaderMovie] = useState()

  const apiKey = process.env.REACT_APP_API_KEY
  const lang = 'fr-fr'

  const tvIds = [71446, 60574, 1399, 66732]
  const moviesIds = [399566, 602734, 579047, 385128, 615658]

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${defaultMovieId}?api_key=${apiKey}&language=${lang}`
    fetch(url)
      .then(response => response.json())
      .then(data => setHeaderMovie(data))
      .catch(err => console.log(err))
  }, [apiKey])

  const [type] = useState(['tv', 'movie'][getRandomIntInclusive(0, 1)])

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
