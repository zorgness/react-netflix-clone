import {lang, API_URL, apiKey} from '../config'

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const clientApi = async endpoint => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  await sleep(2000)
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  return fetch(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
