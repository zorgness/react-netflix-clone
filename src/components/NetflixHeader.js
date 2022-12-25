import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {useFetchData} from 'utils/hooks'
import {clientNetFlix} from './../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'
import React from 'react'

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  const {data, execute} = useFetchData()
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
    async function getTokenExecute() {
      const token = await authNetflix.getToken()
      execute(clientNetFlix(`bookmark`, {token}))
    }
    getTokenExecute()
  }, [execute])

  const handleAddToListClick = async () => {
    const token = await authNetflix.getToken()

    execute(
      clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id: movie.id},
        method: 'POST',
      }),
    )
  }

  const handleDeleteToListClick = async () => {
    const token = await authNetflix.getToken()
    execute(
      clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id: movie.id},
        method: 'DELETE',
      }),
    )
  }

  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(movie?.id)

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
              {isInList ? (
                <button
                  className="banner__button banner__buttonInfo"
                  onClick={handleDeleteToListClick}
                >
                  Supprimer de ma liste
                </button>
              ) : (
                <button
                  className="banner__button banner__buttonInfo"
                  onClick={handleAddToListClick}
                >
                  Ajouter à ma liste
                </button>
              )}
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
