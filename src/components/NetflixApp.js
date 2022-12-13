import React, {useState, useEffect} from 'react'
import netflixLogo from '../images/netflix-logo.png'
import netflixAvatar from '../images/netflix-avatar.png'
import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NetflixAppBar = () => {
  const appBarIntialStyle = {
    background: 'none',
    boxShadow: 'none',
  }

  const [appBarStyle, setAppBarStyle] = useState(appBarIntialStyle)

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: '#111',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      } else {
        setAppBarStyle({
          background: 'transparent',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const margin10 = {margin: 10}
  return (
    <>
      <AppBar style={appBarStyle}>
        <Toolbar>
          <img className="nav__logo" src={netflixLogo} alt="" />
          <a href="/">
            <Typography style={margin10} variant="h6">
              Acceuil
            </Typography>
          </a>
          <a href="/series">
            <Typography style={margin10} variant="h6">
              Serie
            </Typography>
          </a>
          <a href="/movies">
            <Typography style={margin10} variant="h6">
              Films
            </Typography>
          </a>
          <a href="/news">
            <Typography style={margin10} variant="h6">
              Nouveautés les plus regardées
            </Typography>
          </a>
          <a href="/list">
            <Typography style={margin10} variant="h6">
              Ma liste
            </Typography>
          </a>
          <img
            style={{marginLeft: 'auto'}}
            className="nav__avatar"
            src={netflixAvatar}
            alt=""
          />
        </Toolbar>
      </AppBar>
    </>
  )
}
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

  const [type] = ['tv', 'movie'][0]

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
