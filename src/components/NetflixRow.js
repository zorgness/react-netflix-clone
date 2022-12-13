import netflixSample from '../images/sample.jpg'
import netflixSamplePoster from '../images/sample-poster.jpg'

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
export default NetflixRow
