import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {useFetchData} from 'utils/hooks'
// import {clientNetFlix}

import * as authNetflix from '../utils/authNetflixProvider'

const NetflixHeader = ({movie = TYPE_MOVIE}) => {
  const imageUrl = imagePathOriginal + movie?.backdrop_path

  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }
  if (!movie) {
    return <HeaderSkeleton />
  }
  if (movie) {
    return (
      <>
        <header style={banner}>
          <div className="banner__contents">
            <h1 className="banner__title">
              {movie?.title ?? movie?.original_name}
            </h1>
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
