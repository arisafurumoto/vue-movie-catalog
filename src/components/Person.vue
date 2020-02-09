<template>
  <div class="person">
    <div v-show="loading" class="loader"></div>
    <div v-if="!loading">
      <div class="small frame">
        <div class="person-photo">
          <img v-if="person.profile_path !== null" :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + person.profile_path">
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
          <li class="movies-list-item" v-for="(show,index) in knownfor.slice(0,10)" :key="index">
            <movie-card v-if="show.title" :id="show.id" :title="show.title" :poster="show.poster_path" :releasedate="show.release_date" :voteaverage="show.vote_average"></movie-card>
            <tvshow-card v-else :id="show.id" :title="show.original_name" :poster="show.poster_path" :releasedate="show.first_air_date" :voteaverage="show.vote_average"></tvshow-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from './MovieCard.vue'
import TvshowCard from './TvshowCard.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      person: null,
      knownfor: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    function unique (a, param) {
      return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) { return mapItem[param] }).indexOf(item[param]) === pos
      })
    }
    axios
      .get('https://api.themoviedb.org/3/person/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&append_to_response=combined_credits')
      .then(response => {
        this.person = response.data
        if (response.data.known_for_department === 'Acting') {
          response.data.combined_credits.cast.sort(function (a, b) {
            return b.vote_count - a.vote_count
          })
          this.knownfor = response.data.combined_credits.cast.filter(function (value) {
            if (value.character !== undefined && value.character.indexOf('self') <= -1 && value.character.indexOf('Self') <= -1 && value.character !== '') {
              return value
            }
          })
        } else {
          response.data.combined_credits.crew.sort(function (a, b) {
            return b.vote_count - a.vote_count
          })
          this.knownfor = unique(response.data.combined_credits.crew, 'title')
        }
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
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
    MovieCard,
    TvshowCard
  }
}
</script>
<style lang="scss">
.person {
  padding: 50px 0;

  .frame{
    display: flex;
  }

  @media(max-width:730px) {
    .person-photo img{
      width: 150px;
    }
  }

  @media(max-width:599px) {
    .small.frame{
      display:block;
    }

    .person-photo img{
      width: 280px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    .person-content {
      margin: 30px 0;
    }
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
