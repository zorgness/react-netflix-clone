import React from 'react'

// 🐶 créé une structure HTML simple represantant le site de Netflix
// il y aura :
// - une barre de menu
// - un header
// - un zone de pochette de film (format large)
// - un zone de pochette de film (format poster)
// - un footer

const NetflixApp = () => {
  return (
    <div>
      {/* 👨‍✈️ Barre de menu :  créé la barre de menu en créant 7 élements (2 images logo et 5 liens)
      La premiere image sera le logo NetFlix, la derniere image le boutton du compte.*/}
      <div>
        {/* 🐶 créé une <img> avec la source "images/netflix-logo.png" et 'height' de 20px   */}
        <img src={''} height="20" alt="" />
        {/* 🐶 créé  5 liens <a> : Acceuil, Séries, Films, Nouveautés, Ma liste*/}
        {/* 🐶 créé une <img> avec la source "images/netflix-avatar.png" et 'height' de 20px   */}
      </div>

      {/* 👨‍✈️ Header : Contenant un titre, 2 bouttons, zone description */}
      <header>
        <div>
          <h1>La casa del papel</h1>
          <div>
            <button>Lecture</button>

            <button>Ajouter à ma liste</button>
          </div>
          <h1>
            Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d'un cambriolage grandiose ciblant la Maison royale de la
            Monnaie d'Espagne.
          </h1>
        </div>
      </header>

      {/* 👨‍✈️ Zone ligne de films format large */}
      <div>
        {/* 🐶 Créé un titre h2 : Films Netflix */}
        <div>
          {/* 🐶 Créé 4 <img> height à 250 : Alterne avec 'images/sample.jpg' et images/sample1.jpg  */}
        </div>
      </div>

      {/* 👨‍✈️ Zone ligne de films format poster */}
      <div>
        {/* 🐶 Créé un titre h2 : Série Netflix */}
        <div>
          {/* 🐶 Créé 4 <img> height à 300 : Alterne avec 'images/sample-poster.jpg' et images/sample-poster1.jpg  */}
        </div>
      </div>

      <footer>2021 - Netflix Clone</footer>
    </div>
  )
}
export {NetflixApp}
