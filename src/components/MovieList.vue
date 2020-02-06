<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <div class="frame">
      <ul class="movies-list">
        <li class="movies-list-item" v-for="(movie,index) in movies" :key="index">
          <movie-card :id="movie.id" :title="movie.title" :poster="movie.poster_path" :releasedate="movie.release_date" :voteaverage="movie.vote_average"></movie-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MovieCard from './MovieCard.vue'

export default {
  name: 'MovieList',
  data () {
    return {
      movies: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/week?api_key=6ed12e064b90ae1290fa326ce9e790ff')
      .then(response => {
        this.movies = response.data.results
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
      })
  },
  components: {
    MovieCard
  }
}
</script>

<style lang="scss">
.home-content{
  transform:translateY(-60px);
}
</style>
