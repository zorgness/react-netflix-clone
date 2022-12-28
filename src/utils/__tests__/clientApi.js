import {clientAuth, clientNetFlix} from 'utils/clientApi'
import {server} from 'mocks'
import {AUTH_URL} from '../../config'
import {rest} from 'msw'

import * as authNetflix from '../authNetflixProvider'
jest.mock('../../utils/authNetflixProvider')

test('faire une requette HTTP GET vers un endpoint', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(resultRequest))
    }),
  )
  const result = await clientAuth(endpoint)
  expect(result.data).toEqual(resultRequest)
})

test('Verifier les data passées en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const data = {fake: 'fakedata'}
  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {data})
  expect(data).toEqual(request.body)
})

test('Verifier le token  passé en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const token = 'faketoken'
  let request
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('Verifier le couple token/data passé en parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const token = 'faketoken'
  const data = {fake: 'fakedata'}
  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, {token, data})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
  expect(data).toEqual(request.body)
})

test('Verifier le message d erreur sur 401', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = {mockResult: 'TEST'}
  const token = 'faketoken'
  const data = {fake: 'fakedata'}

  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(resultRequest))
    }),
  )
  const error = await clientNetFlix(endpoint, {
    token,
    data,
    method: 'POST',
  }).catch(error => error)
  expect(error.message).toMatchInlineSnapshot(`"Authentification incorrecte"`)
  expect(authNetflix.logout).toHaveBeenCalledTimes(1)
})

test('Verifier le message d erreur sur 400', async () => {
  const endpoint = 'fake-endpoint'
  const resultError = {message: 'Fake Error'}

  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(resultError))
    }),
  )

  await expect(clientNetFlix(endpoint)).rejects.toEqual(resultError)
})
