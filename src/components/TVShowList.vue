<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <div class="frame">
      <search :category="'TV Shows'"></search>
      <div v-show="loading" class="loader"></div>
      <ul class="movies-list">
        <li class="movies-list-item" v-for="(tvshow,index) in tvshows" :key="index">
          <tvshow-card :id="tvshow.id" :title="tvshow.original_name" :poster="tvshow.poster_path" :releasedate="tvshow.first_air_date" :voteaverage="tvshow.vote_average"></tvshow-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import TvshowCard from './TvshowCard.vue'
import Search from './Search.vue'

export default {
  name: 'TvshowList',
  data () {
    return {
      tvshows: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/trending/tv/week?api_key=6ed12e064b90ae1290fa326ce9e790ff')
      .then(response => {
        this.tvshows = response.data.results
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
      })
  },
  components: {
    TvshowCard,
    Search
  }
}
</script>
