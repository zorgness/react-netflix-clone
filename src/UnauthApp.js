import * as React from 'react'
import LoginRegister from './components/LoginRegister'

function UnauthApp({login, register}) {
  const imageUrl = '/images/posters.jpg'
  return (
    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',

        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
      }}
    >
      <img
        src="/images/netflix-logo.png"
        alt=""
        style={{margin: '30px'}}
        height={50}
      />

      <div>
        <LoginRegister open={true} login={login} register={register} />
      </div>
    </div>
  )
}

export {UnauthApp}
