import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {useFetchData} from 'utils/hooks'
import {clientNetFlix} from './../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import React from 'react'

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  const {data, error, status, execute} = useFetchData()
  const imageUrl = imagePathOriginal + movie?.backdrop_path
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }

  React.useEffect(() => {
    const token = authNetflix.getToken()
    execute(clientNetFlix(`bookmark`, {token}))
  }, [])

  // 🐶 utilise le hook 'useEffect' pour faire l'appel API GET '/bookmark'
  // pour cela utilise :
  // 🤖
  // authNetflix.getToken()
  // execute(clientNetFlix(`bookmark`, {token}))
  // NOTE : authNetflix.getToken() s'utilise de manière asynchrone avec 'await'

  // 🐶 créé un boolean 'isInList' permetant de s'avoir si 'movie.id' est deja
  // dans la liste des favoris récuperer par l'api '/bookmark'
  // rapel du format des données reçues
  // data.bookmark.movies[ids de films]
  // data.bookmark.tv[ids de séries]

  // 🐶 créé une fonction async 'handleAddToListClick' qui fera l'appel API REST
  // '/bookmark/tv' ou '/bookmark/movie'
  // utilise 'clientNetFlix' car il permet de passer des options : {token,data,method}
  // - passe le 'token'
  // - passe comme 'data' : id (l'id du film/serie)
  // - passe come 'method' 'POST'

  // 🐶 créé une fonction async 'handleDeleteToListClick'
  // pareil que précedement mais en utilisant la methode 'DELETE'
  if (!movie) {
    return <HeaderSkeleton />
  }
  if (movie) {
    return (
      <>
        <header style={banner}>
          <div className="banner__contents">
            <h1 className="banner__title">{title}</h1>
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

export default NetflixHeader
