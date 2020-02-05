<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <div class="frame">
      <div class="casts">
        <person-card :key="cast.name" v-for="cast in people" :id="cast.id" :name="cast.name" :knowntv="cast.known_for[0].original_name" :knownmovie="cast.known_for[0].title" :photo="cast.profile_path"></person-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PersonCard from './PersonCard.vue'

export default {
  name: 'PersonList',
  data () {
    return {
      people: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/person/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1')
      .then(response => {
        response.data.results.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        this.people = response.data.results
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
      })
  },
  components: {
    PersonCard
  }
}
</script>

<style lang="scss">
</style>
