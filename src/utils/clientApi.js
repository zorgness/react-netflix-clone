import {lang, API_URL} from '../config'

const clientApi = endpoint => {
  const apiKey = process.env.REACT_APP_API_KEY
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  return fetch(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
