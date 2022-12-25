import React, {useState} from 'react'
import {getRandomType, getRandomId} from 'utils/helper'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixHeader} from './NetflixHeader'
import {NetflixFooter} from './NetflixFooter'
import {NetflixRow} from './NetflixRow'
import {clientApi} from 'utils/clientApi'
import {useQuery} from 'react-query'
import {useMovie} from 'utils/hooksMovies'
import {TYPE_MOVIE, TYPE_TV} from 'config'

const NetflixMovies = ({logout}) => {
  const [type] = useState(getRandomType())

  const defaultMovieId = getRandomId(type)

  // const {data: headerMovie} = useQuery(`${type}/${defaultMovieId}`, () =>
  //   clientApi(`${type}/${defaultMovieId}`),
  // )
  const {data: headerMovie} = useMovie(type, defaultMovieId)

  return (
    <>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie?.data} type={type} />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter={'trending'}
        title="Films Netflix"
      />

      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter={'trending'}
        title="Série Netflix"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter={'toprated'}
        title="Les mieux notés"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        param={10759}
        filter="genre"
        title="Action & aventure"
      />

      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        param={53}
        filter="genre"
        title="Les meilleurs Thrillers"
      />

      <NetflixFooter />
    </>
  )
}
export {NetflixMovies}
