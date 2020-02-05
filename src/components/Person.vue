<template>
  <div class="person">
    <div class="small frame">
      <div class="person-photo">
        <img v-if="person.profile_path !== null" :src="'https://image.tmdb.org/t/p/w276_and_h350_face' + person.profile_path">
        <div v-else class="person-photo-placeholder">
          <i class="fas fa-user"></i>
        </div>
      </div>
      <div class="person-content">
        <h1>{{ person.name }}</h1>
        <span class="person-content-data"><h3 class="person-content-data__title">Born:</h3>{{ person.birthday | month-date-year }} in {{ person.place_of_birth }} ({{ getAge(person.birthday) }})</span>
        <h3>Biography</h3>
        <p>{{ person.biography }}</p>
      </div>
    </div>
    <div class="frame">
      <h2>Known For</h2>
    </div>
    <div class="frame">
      <ul class="movies-list">
          <movie-card v-for="(movie,index) in knownfor.slice(0,10)" :key="index" :id="movie.id" :title="movie.title" :poster="movie.poster_path" :releasedate="movie.release_date" :voteaverage="movie.vote_average"></movie-card>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from './MovieCard.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      person: null,
      knownfor: null
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/person/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&append_to_response=credits')
      .then(response => {
        this.person = response.data
        response.data.credits.cast.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        this.knownfor = response.data.credits.cast
      })
  },
  methods: {
    getAge: function (birthday) {
      const today = new Date()
      const birthDate = new Date(birthday)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  },
  components: {
    MovieCard
  }
}
</script>
<style lang="scss">
.person {
  padding: 50px 0;

  > .frame{
    display: flex;
  }

  &-photo {
    img {
      border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    &-placeholder{
      background:radial-gradient(circle at top right, #029e67 0%,#052A31 70%,#031D2B 100%);
      position: relative;
      width: 275px;
      height: 350px;

      i{
        position: absolute;
        color: #01D277;
        top: 50%;
        left: 50%;
        font-size: 70px;
        transform: translate(-50%,-50%);
        z-index: 0;
      }
    }
  }

  &-content {
    margin-left: 30px;

    h1 {
      margin-top: 0;
    }

    p {
      line-height: 24px;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    &-data {
      display: block;
      line-height: 24px;

      &__title {
        display: inline-block;
        margin-right: 7px;
      }
    }
  }
}
</style>
