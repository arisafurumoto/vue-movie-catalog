<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <div class="frame">
      <search :category="'People'"></search>
      <div v-show="loading" class="loader"></div>
      <div class="casts">
        <person-card :key="cast.name" v-for="cast in people" :id="cast.id" :name="cast.name" :knownfor="cast.known_for" :photo="cast.profile_path"></person-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PersonCard from './PersonCard.vue'
import Search from './Search.vue'

export default {
  name: 'PersonList',
  data () {
    return {
      people: null,
      loading: true,
      errored: false
    }
  },
  methods: {
    search: function (keyword) {
      this.people = []
      this.loading = true
      axios
        .get('https://api.themoviedb.org/3/search/person?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&query=' + keyword + '&page=1&include_adult=false')
        .then(response => {
          this.people = response.data.results
        }).catch(error => {
          console.log(error)
          this.errored = true
        }).finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    if (this.$route.query.search) {
      this.search(this.$route.query.search)
    } else {
      axios
        .get('https://api.themoviedb.org/3/trending/person/week?api_key=6ed12e064b90ae1290fa326ce9e790ff')
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
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.search(to.query.search)
    next()
  },
  components: {
    PersonCard,
    Search
  }
}
</script>

<style lang="scss">
</style>
