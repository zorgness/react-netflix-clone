import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {useFetchData} from 'utils/hooks'
import {clientApi} from 'utils/clientApi'
import {TYPE_MOVIE} from './../config'
import React from 'react'
import {imagePath400} from './../config'

const NetflixRow = ({
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  latest,
  genre,
  trending,
  filter,
  watermark = false,
}) => {
  // 🐶 Utilise le Hook 'useFetchData' (avec {data, error, status, execute})
  const {data, error, status, execute} = useFetchData()
  const endpointLatest = `${type}/latest`
  const endpointPopular = `${type}/popular`
  const endpointTopRated = `${type}/top_rated`
  const endpointGenre = `discover/${type}?with_genres=${param}`
  const endpointTrending = `trending/${type}/day`

  let endpoint
  switch (filter) {
    case 'populaire':
      endpoint = endpointPopular
      break
    case 'latest':
      endpoint = endpointLatest
      break
    case 'toprated':
      endpoint = endpointTopRated
      break
    case 'genre':
      endpoint = endpointGenre
      break
    case 'trending':
      endpoint = endpointTrending
      break
    default:
      throw new Error('Type non supporté')
  }

  React.useEffect(() => {
    execute(clientApi(endpoint))
  }, [execute, endpoint])

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return `${imagePath400}${image}`
  }
  const watermarkClass = watermark ? 'watermarked' : ''

  if (status === 'fetching' || status === 'idle') {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          <CircularProgress />
        </div>
      </div>
    )
  }
  if (status === 'error') {
    return (
      <Alert severity="error">
        <AlertTitle>Une erreur est survenue</AlertTitle>
        Detail : {error.message}
      </Alert>
    )
  }
  console.log(data)
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {data?.results?.map(item => {
            return (
              <img
                src={buildImagePath(item)}
                alt=""
                className="row__poster row__posterLarge"
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
export default NetflixRow
