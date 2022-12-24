import * as React from 'react'
// 🐶 importe le composant 'LoginRegister' qui est dans ./components/LoginRegister

// 🐶 passe les props 'login' et 'register' qui sont utilise à <Login>
function UnauthApp() {
  // 👨‍✈️ hugo souhaite une image de fond avec des films Netflix pour page <LoginRegister />
  // utilise celle ci :
  // 🤖 const imageUrl = '/images/posters.jpg'
  return (
    // 🐶 applique ce style pour avoir l'image de fond
    // backgroundImage: `url('${imageUrl}')`,
    // backgroundSize: 'cover',

    // position: 'fixed',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // overflow: 'auto',
    <div style={{color: 'black'}}>
      {/* 🐶 créé un logo : une balise <img> /images/netflix-logo.png
     - margin à '30px
     - height à 50
    */}

      <h1>lol</h1>

      <div>
        {/* ⛏️ supprime le texte ci dessous et remplace le par le composant <LoginRegister>
      Passe les props :
      - open={true}
      - login
      - register
       */}
        Vous n'êtes pas connecté
      </div>
    </div>
  )
}

export {UnauthApp}
