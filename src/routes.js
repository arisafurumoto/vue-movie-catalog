import Home from './components/Home.vue'
import MovieList from './components/MovieList.vue'
import Movie from './components/Movie.vue'
import TVList from './components/TVShowList.vue'
import TV from './components/TVShow.vue'
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
    component: TVList
  },
  {
    path: '/tvshow/:id',
    component: TV
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
