import React from 'react'
import netflixLogo from '../images/netflix-logo.png'
import netflixAvatar from '../images/netflix-avatar.png'
import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'

const NetflixApp = () => {
  return (
    <div>
      <div>
        <img src={netflixLogo} height="20" alt="" />
        <a href={{}}>Acceuil</a>
        <a href={{}}>Séries</a>
        <a href={{}}>Films</a>
        <a href={{}}>Nouveautés</a>
        <a href={{}}>Ma liste</a>
        <img src={netflixAvatar} height="20" alt="" />
      </div>

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
