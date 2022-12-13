import {lang, API_URL, apiKey} from '../config'

const clientApi = endpoint => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  return fetch(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
