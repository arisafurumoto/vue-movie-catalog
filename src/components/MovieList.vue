<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <div class="frame">
      <search :category="'Movies'"></search>
      <div v-show="loading" class="loader"></div>
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
import Search from './Search.vue'
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
    MovieCard,
    Search
  }
}
</script>

<style lang="scss">
.home-content{
  transform:translateY(-60px);
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #01D277;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
