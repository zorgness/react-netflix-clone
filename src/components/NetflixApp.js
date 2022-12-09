import React from 'react'
import netflixLogo from '../images/netflix-logo.png'
import netflixAvatar from '../images/netflix-avatar.png'
import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NetflixApp = () => {
  const appBarStyle = {
    background: 'none',
    boxShadow: 'none',
  }
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

      <header>
        <div>
          <h1>La casa del papel</h1>
          <div>
            <button>Lecture</button>

            <button>Ajouter à ma liste</button>
          </div>
          <h1>
            Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d'un cambriolage grandiose ciblant la Maison royale de la
            Monnaie d'Espagne.
          </h1>
        </div>
      </header>

      <div>
        <h2>Films Netflix</h2>
        <div>
          <img src={netflixSample} alt="" height={250} />
        </div>
      </div>

      <div>
        <h2>Série NetFlix</h2>
        <div>
          <img src={netflixSamplePoster} alt="" height={300} />
        </div>
      </div>

      <footer>2021 - Netflix Clone</footer>
    </div>
  )
}
export {NetflixApp}
