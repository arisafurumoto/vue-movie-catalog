import MovieList from './components/MovieList.vue'
import MovieParent from './components/MovieParent.vue'
import Movie from './components/Movie.vue'
import PersonParent from './components/PersonParent.vue'
import Person from './components/Person.vue'

export const routes = [
  {
    path: '',
    component: MovieList
  },
  {
    path: '/movie',
    component: MovieParent,
    children: [
      {
        path: ':id',
        component: Movie
      }
    ]
  },
  {
    path: '/person',
    component: PersonParent,
    children: [
      {
        path: ':id',
        component: Person
      }
    ]
  }
]
