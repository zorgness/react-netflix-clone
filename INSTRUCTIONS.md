# Context API (historique des visites)

### 💡 Context API & state management (historique des visites)

## 📝 Tes notes

Detaille ce que tu as appris ici
`INSTRUCTIONS.md`ou sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre# Gestion de cache avec React-Query

### 💡 Gestion de cache avec React-Query

## 📝 Tes notes

Detaille ce que tu as appris ici
`INSTRUCTIONS.md`ou sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

Dans une application nous devons souvent gérer deux choses importantes,
l'affichage et les données (provenant du backend). Gérer ces états (
`state management` ) peut vite devenir compliqué. On a d'un coté les états de
l'application coté front

- Le user est-il connecté ?
- Une erreur est-elle survenue ?
- Le thème est il en dark mode / Light mode ?
- etc ...

Et les états des données cotés backend

- La liste des derniers films
- Les mieux notés
- Les séries tendances
- Les favoris (bookmark) de l'utilisateur
- etc ...

Les applications deviennent de plus en plus complexes et on a tendance à
mélanger tous les states alors qu'il est préférable de les séparer. il existe
des dizaines d'outils de gestion d'états, mais il ne sont parfois pas dédiées à
la gestion des données cotés serveur, avec gestion de la mémoire cache, ce qui
veut dire que ce mécanisme est à réimplémenter. Heureusement
[React-Query](https://react-query.tanstack.com/) permet de faire cela :

```jsx
// Querie
const bookmark = useQuery('bookmark', clientApi(`/bookmark`))

// Mutation & Cache
const cache = useQueryCache()

const [addBookmark] = useMutation(clientApi(`/bookmark`, filmId, 'POST'), {
  onSuccess: () => {
    // Query Invalidations
    cache.invalidateQueries('bookmark')
  },
})
```

📑 Le liens vers les `hooks`

- [useQuery](https://react-query.tanstack.com/reference/useQueries#_top)
- [useMutation](https://react-query.tanstack.com/reference/useMutation#_top)

## Exercice

👨‍✈️ Hugo le chef de projet nous indique que le nombre d'utilisateurs augmente
rapidement. Il veut que l'on gère les données en cache ,cela rendra le site plus
rapide et évitera les surcharges d'appels vers le backend.

Ton boulot va d'être de changer tout les appels API (TMDB et Auth) par
`react-query`. Pense à utiliser le même nom de `query` pour les appels
identiques. cela nous permettra de supprimer les donnée en cache. par exemple

- `useQuery('bookmark')`
- `useQuery('tv/555')`
- `useQuery('discover/movies-genres=758')`

Pour la fonctionnalité d'ajout aux favoris, utilise le `hook useMutation` et
invalide les données en cache avec `cache.invalidateQueries('bookmark')`

Commence par `App.js,` ensuite toutes les `queries` et termine par les
`mutations`

**Fichiers :**

- `src/App.js`
- `src/components/NetflixAppjs`
- `src/components/NetflixById.js`
- `src/components/NetflixHeader.js`
- `src/components/NetflixMovies.js`
- `src/components/NetflixRow.js`
- `src/components/NetflixNews.js`
- `src/components/NetflixSeries.js`
- `src/components/NetflixBookmark.js`

## Bonus

### 1. 🚀 Configuration retry / error

Il est possible de configurer finement `React-Query`, comme par exemple
rafraichir les données lorsque le navigateur a le focus, gérer les erreurs, le
nombre de tentatives sur erreur etc ...

Dans cet exercice tu vas devoir configurer le `QueryClient` dans `App.js`

📑
[https://react-query.tanstack.com/reference/QueryClient#\_top](https://react-query.tanstack.com/reference/QueryClient#_top)

On veut avoir le caractéristiques suivantes sur les `queries`et `mutations`

- un délais entre 2 tentatives de 500ms
- 3 tentatives de connexion par défaut sauf pour :
  - error 404 ou 401 pas de nouvelles tentatives
- utilisation de `ErrorBoundary` en cas d'erreur
- désactiver l'option qui `refetch` sur le focus de la fenêtre
- 1 seul tentative de reconnexion sur mutation.

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: (failureCount, error) => {
        if (error.status === 404) return false
        else if (error.status === 401) return false
        else if (failureCount > 3) return false
        else return true
      },
    },
    mutations: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: 1,
      // mutation options
    },
  },
})
```

Nous allons devoir adapter la fonction `clientApi` qui est dans
`src//utils/clientApi.js` pour retourner le `status` (pour connaitre le code 401
404 etc ...) et avoir afficher le message d'erreur de l'api TMDB. Pour rappel
cette api retourne

```json
{
  "success": false,
  "status_code": 34,
  "status_message": "The resource you requested could not be found."
}
```

Adapte la fonction `clientApi` et au lieu de retourner

```jsx
return axios.get(`${API_URL}/${endpoint}${keyLang}`).
```

catch l'erreur (qui contient le `status` dans `error.response` de `axios`)

```jsx
return axios.get(`${API_URL}/${endpoint}${keyLang}`).catch(error => {
  // retourne err qui est un objet qui contient le 'status' et 'message'
  return Promise.reject(err)
})
```

La propriété `message` est utilisée sur le composant `ErrorFallback` de
`errorBoundary` . Utilise un `spred operérator`

```jsx
const err = {
  ...error.response,
  message: error.response?.data?.status_message,
}
return Promise.reject(err)
```

Pour tester l'erreur utilise cette URL

- [http://localhost:3000/movie/id-inexistant](http://localhost:3000/movie/id-inexistant)

**Fichiers :**

- `src//App.js`
- `src//utils/clientApi.js`

### 2. 🚀 Faire des Hooks personnalisés

La modification des appels API, le passage de notre hook `useFechData` à
`useQuery` à du être répété dans de nombreux fichiers. A la place il est
préférable de centraliser cela dans des `hooks` personnalisés. Par exemple

- `useMovie(type, id)`
- `useMovieGroup(type, filter, param)`
- `useBookmark()`
- `useAddBookmark(type, id)`
- `useDeleteBookmark(type, id)`

**Tu vas devoir créer ces hooks :**

1. Pour les hooks `GET` le code est sensiblement le même que dans les composants
   qui utilisent `useQuery`.

   Remplace ensuite tous les appels par :

   ```jsx
   const {data: headerMovie} = useQuery(`${type}/${defaultMovieId}`, () =>
     clientApi(`${type}/${defaultMovieId}`),
   )

   //en ca
   const headerMovie = useMovie(type, defaultMovieId)
   // pense a changer headerMovie.data en headerMovie dans <NetflixHeader>
   ```

2. Pour les hooks personnalisés qui **utilisent les mutations :**

   Le principe consiste à utiliser `useMutation` et passer les callbacks
   `onSuccess onError onSettled onMutate` en paramètres pour pouvoir utiliser
   ces `hooks` de la manière suivante :

   ```jsx
   const addMutation = useAddBookmark({
     onSuccess: () => {
       setSnackbarOpen(true)
       setMutateBookmarkError()
     },
     onError: error => {
       setSnackbarOpen(true)
       setMutateBookmarkError(error)
     },
   })
   ```

Note sur tous les composants utilisant ces nouveaux hooks

> Supprime tous les `status === 'error'` car c'est gérer par `errorBoundary`

> Remplace tous les `status === 'loading'` par `!data`

> Remplace tous les `headerMovie.data` par `data`

**Fichiers :**

- `src/utils/hookMovies.js`
- `src/components/NetflixApp.js`
- `src/components/NetflixAppjs`
- `src/components/NetflixById.js`
- `src/components/NetflixHeader.js`
- `src/components/NetflixMovies.js`
- `src/components/NetflixRow.js`
- `src/components/NetflixNews.js`
- `src/components/NetflixSeries.js`
- `src/components/NetflixBookmark.js`

### 3. 🚀 Récupérer les erreurs de mutation

Nous voulons un comportement spécial pour les erreurs de mutations. Nous ne
voulons pas utiliser `ErrorBoundary` mais plutôt utiliser le composant `Mui`
Alerte et Snackbar. Il ne faut donc pas mettre `useErrorBoundary: true` pour les
mutations.

```jsx
mutations: {
 useErrorBoundary: false,
 refetchOnWindowFocus: false,
 retryDelay : 500,
 retry:1,
  // mutation options
},

// onError sera ensuite pris en compte
onError: error => {
  setSnackbarOpen(true)
  setMutateBookmarkError(error)
},
```

> Pour simuler une erreur de mutation, modifie `useAddBookmark` et passe un
> `token` invalide : par exemple `token:'inexistant'`,

### 4. 🚀 Rechercher des films

👨‍✈️ Hugo le chef de projet nous demande de créer une fonctionnalité de recherche
de films / séries. Il souhaite ajouter un champs de recherche dans la
`NetflixAppBar`.

**Les étapes pour développer cette fonctionnalité :**

1. Créer un `hook` personnalisé (`src/utils/hooksMovies`) :

   `useSearchMovie(query)` qui va appeler l'api suivante :

   - `search/multi?query=${query}` avec `useQuery` et `clientApi`

2. Créer un composant `<NetflixSearch/>` (`src/components/NetflixSearch`) pour
   la route `/search/:query` :

   - Connecter la route au composant dans `AuthApp` (déjà fait)

   ```jsx
   <Route path="/search/:query" element={<NetflixSearch logout={logout} />} />
   ```

   - Utiliser `useParams` pour récupérer `query`
   - Appeler `useSearchMovie(query)` pour faire la recherche :
   - Filtrer les films et séries et afficher deux `rows` : ligne film/ligne
     séries
   - url de test :
     [http://localhost:3000/search/walking](http://localhost:3000/search/walking)

3. Ajouter le champs de recherche dans la `<NetflixAppBar>`
   (`src/components/NetFlixAppbar`) :
   - Base toi sur l'exemple : 📑
     [https://mui.com/components/app-bar/#app-bar-with-search-field](https://mui.com/components/app-bar/#app-bar-with-search-field)
   - Lors d'un clique sur `'enter'` redirection vers la bonne route : exemple :
     [http://localhost:3000/search/walking](http://localhost:3000/search/walking)

### 5. 🚀 React Query DevTools

Dans une application il peut y avoir des centaines de requetes à analyser.
`React Query` propose un outils de développement que l'on peut utiliser lors des
phases de développement `process.env.NODE_ENV === 'development'`.

```jsx
import {ReactQueryDevtools} from 'react-query/devtools'

{
  process.env.NODE_ENV === 'development' && (
    <ReactQueryDevtools initialIsOpen={false} />
  )
}
```

Ajoute `ReactQueryDevtools` uniquement en `'development'` en composant enfant de
`<QueryClientProvider>`

**Fichiers :**

- `src/App.js`

### 6. 🚀 Suppression cache sur Logout

Dans notre application nous gardons les données en mémoire cache. Par exemple la
liste des films / series favoris. `(/bookmark`). Que se passe-t-il si on
utilisateur se déconnecte et qu'un nouvel utilisateur se connecte ? Les favoris
et autres données seront récupérer de la mémoire cache. C'est pourquoi il faut
supprimer les données en cache sur la déconnexion d'un utilisateur. Pour cela on
va utiliser

```jsx
queryClient.clear()
```

Dans cet exercice tu vas devoir appeler `queryCache.clear()` lors de l'appel à
`logout`

📑
[https://react-query.tanstack.com/reference/QueryClient#queryclientclear](https://react-query.tanstack.com/reference/QueryClient#queryclientclear)

**Fichiers :**

- `src/App.js`

## 🐜 Feedback

Remplir le formulaire
[le formulaire de FeedBack.](https://go.mikecodeur.com/cours-react-avis?entry.1430994900=React%20NetFlix%20Clone&entry.533578441=11%20Gestion%20de%20cache%20avec%20React-Query)

Comme pour le `AuthContext`, nous avons besoin de gérer des états dans notre
application sans avoir à les passer en props de composant en composant (props
drill). Nous n'allons pas utiliser le `AuthContext` qui sert à la logique
d'authentification. A la place nous allons créer des contextes spécifiques pour
gérer les états (state management) de nos différentes fonctionnalités de notre
application. On pourrait imaginer a terme avoir quelque chose du genre :

```html
- AuthContext - Paymentcontext - SearchContext - etc etc ...
```

## Exercice

👨‍✈️ Hugo le chef de projet nous demande un fonctionnalité d'historique des
derniers films et séries visités. Cela permettra à l'utilisateur de retrouver
facilement un film qui a déjà été vu ou visité (c'est à dire où l'utilisateur
est allé voir la fiche de détails du film/série). Cette liste des N derniers
films/séries sera affichée dans un menu déroulant en haut à droite lors d'un
clique sur un icone. Dans cet exercice tu vas devoir créer un composant
`MenuHistory` en utilisant 2 composants de Mui `:`

- Menu Customisé : 📑
  [https://mui.com/components/menus/#customization](https://mui.com/components/menus/#customization)
- Card material : 📑
  [https://mui.com/components/cards/#ui-controls](https://mui.com/components/cards/#ui-controls)

Ce composant affichera la liste de l'historique et lors d'un clique sur un item
l'utilisateur sera redirigé vers la page du film

> Les données (films / séries) ne seront pas passés en `props` mais récupérer
> via l'`API Context`.

Un icone placé dans la `NetflixAppBar` permettra de déplier ce composant

```jsx
<MenuHistory style={{cursor: 'pointer', marginRight: '10px'}} />
```

Tu vas donc devoir créer un contexte `HistoryMoviesContext` qui permettra
d'ajouter des films / séries et d'accéder à ses films / séries. Ce contexte sera
utilisé :

- Dans `MenuHistory` pour lire les dernier films / series visités
- Dans `NetFlixById` pour ajouter le film/série en cours de visite.

**Fichiers :**

- `src/context/HistoryMoviesContext.js`
- `src/components/MenuHistory.js`
- `src/components/NetFlixById.js`

## Bonus

### 1. 🚀 Logique réutilisable useReducer

Plutôt que d'avoir à gérer les `arrays` d'historique de `series` et `movies`
dans les différents endroit de l'application il est préférable de centraliser
cette logique dans le Provider. A la place d'avoir à gérer cela dans
`NetflixById`

```jsx
const {series, movies, setMovies, setSeries} = useHistoryMovie()
//...
if (type === TYPE_TV) {
  setSeries([
    headerMovie,
    ...series.slice(
      0,
      series.length >= MAX_ELEMENTS ? MAX_ELEMENTS - 1 : series.length,
    ),
  ])
} else {
  setMovies([
    headerMovie,
    ...movies.slice(
      0,
      movies.length >= MAX_ELEMENTS ? MAX_ELEMENTS - 1 : movies.length,
    ),
  ])
}
```

Tu vas devoir créer cette logique dans `HistoryMovieContext.` Pour cela
n'utilise plus les states `series` et `movies` mais utilise le hook `useReducer`
avec un `reducer` de telle manière que l'on puisse utiliser `useHistoryMovie` de
la manière suivante.

```jsx
const {addSerie, addMovie} = useHistoryMovie()
//...
addSerie(movie)
addSerie(serie)
```

**Fichiers :**

- `src/components/NetflixApp.js`

### 2. 🚀 hook useAddToHistory

Plutôt que d’avoir à gérer un `side effect`, le type etc ... comme cela

```jsx
React.useEffect(() => {
  if (headerMovie) {
    if (type === TYPE_TV) {
      addSerie(headerMovie)
    } else {
      addMovie(headerMovie)
    }
  }
<<<<<<< Updated upstream
=======
// eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> Stashed changes
},[headerMovie])
```

Créé un hook `useAddToHistory` qui permettra une utilisation simplifier de la
forme

```jsx
useAddToHistory(movie, type)
```

## 🐜 Feedback

Remplir le formulaire le
[formulaire de FeedBack](https://go.mikecodeur.com/cours-react-avis).
