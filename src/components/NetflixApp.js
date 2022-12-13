import React, {useState, useEffect} from 'react'
import netflixLogo from '../images/netflix-logo.png'
import netflixAvatar from '../images/netflix-avatar.png'
import netflixSample from '../images/sample.jpg'
import netflixSample2 from '../images/sample1.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'
import netflixSamplePoster2 from '../images/sample-poster1.jpg'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NetflixApp = () => {
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
  const margin10 = {
    margin: '10px',
  }
  return (
    <div>
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

      <header className="banner">
        <div className="banner__contents">
          <h1 className="banner__title">La casa del papel</h1>
          <div className="banner__buttons">
            <button className="banner__button">Lecture</button>

            <button className="banner__button">Ajouter à ma liste</button>
          </div>
          <h1 className="synopsis">
            Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d'un cambriolage grandiose ciblant la Maison royale de la
            Monnaie d'Espagne.
          </h1>
        </div>
      </header>

      <div className="row">
        <h2>Films Netflix</h2>
        <div className="row__posters">
          <img
            src={netflixSample}
            alt=""
            className="row__poster row__posterLarge"
          />
          <img
            src={netflixSample2}
            alt=""
            className="row__poster row__posterLarge"
          />
        </div>
      </div>

      <div>
        <h2>Série NetFlix</h2>
        <div className="row__posters">
          <img
            src={netflixSamplePoster}
            alt=""
            className="row__poster row__posterLarge"
          />
          <img
            src={netflixSamplePoster2}
            alt=""
            className="row__poster row__posterLarge"
          />
        </div>
      </div>

      <footer>2022 - Netflix Clone</footer>
    </div>
  )
}
export {NetflixApp}
