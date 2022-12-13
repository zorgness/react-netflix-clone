import React, {useState, useEffect} from 'react'
import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'
import {getRandomIntInclusive} from 'utils/helper'
import NetflixAppBar from './NetflixAppBar'

const NetflixHeader = ({movie}) => {
  const imagePath = process.env.REACT_APP_IMAGE_PATH

  const imageUrl = imagePath + movie?.backdrop_path

  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }
  if (movie) {
    return (
      <>
        <header style={banner}>
          <div className="banner__contents">
            <h1 className="banner__title">{movie?.title ?? null}</h1>
            <div className="banner__buttons">
              <button className="banner__button banner__buttonplay">
                Lecture
              </button>
              <button className="banner__button banner__buttonInfo">
                Ajouter à ma liste
              </button>
            </div>
            <h1 className="synopsis">{movie?.overview ?? null}</h1>
          </div>
          <div className="banner--fadeBottom"></div>
        </header>
      </>
    )
  } else {
    return <></>
  }
}
const NetFlixFooter = () => {
  return <footer className="footer">2021 - Netflix Clone</footer>
}

const NetflixRow = ({title, wideImage}) => {
  const image = wideImage ? netflixSamplePoster : netflixSample
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          <img src={image} alt="" className="row__poster row__posterLarge" />
          <img src={image} alt="" className="row__poster row__posterLarge" />
        </div>
      </div>
    </>
  )
}

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
      <NetFlixFooter />
    </>
  )
}
export {NetflixApp}
