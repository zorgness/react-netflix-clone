import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'
import {
  useFetchData,
  Alert,
  AlertTitle,
  CircularProgress,
  imagePath400,
} from 'utils/hooks'
import {clientApi} from 'utils/clientApi'
import {TYPE_MOVIE} from './../config'
import React from 'react'

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
  // 🐶 determine le bon 'endpoint' qui permet de faire le bon appel API
  // utilise le prop 'filter' pour determiner le bon enpoint.
  //
  // les 5 endpoints possibles pour le moment sont
  //
  // const endpointPopular = `${type}/popular`
  // const endpointLatest = `${type}/latest`
  // const endpointTopRated = `${type}/top_rated`
  // const endpointGenre = `discover/${type}?with_genres=${param}`
  // const endpointTrending = `trending/${type}/day`

  // 🐶 utilise le Hook 'useEffect' pour faire le bon appel API
  // en utilisant 'execute', 'clientAPi', 'endpoint'

  React.useEffect(() => {
    execute(clientApi())
  })

  // 🐶 créé une fonction 'buildImagePath' qui prend en paramètre 'data', data sera la donnée
  // provenant de l'api, elle peut etre une film ou une serie.
  // le but de cette fonction est de retourner la bonne URL de l'image en fonction du prop 'wideImage'
  // Si 'wideImage' est à 'true' on utilisera le champs 'backdrop_path' sinon 'poster_path'
  // utilise la constante 'imagePath400' qui contient le debut de l'url pour un image.
  const image = wideImage ? netflixSample : netflixSamplePoster
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
export default NetflixRow
