import Home from './components/Home.vue'
import MovieList from './components/MovieList.vue'
import Movie from './components/Movie.vue'
import TvList from './components/TvshowList.vue'
import Tv from './components/Tvshow.vue'
import PersonList from './components/PersonList.vue'
import Person from './components/Person.vue'

export const routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '/movie',
    component: MovieList
  },
  {
    path: '/movie/:id',
    component: Movie
  },
  {
    path: '/tvshow',
    component: TvList
  },
  {
    path: '/tvshow/:id',
    component: Tv
  },
  {
    path: '/person',
    component: PersonList
  },
  {
    path: '/person/:id',
    component: Person
  }
]
