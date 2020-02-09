<template>
    <section class="movie">
      <div v-show="loading" class="loader"></div>
      <div v-if="!loading">
        <v-style>
          .movie-content:before {
            background-image: url('https://image.tmdb.org/t/p/original{{ tvshow.backdrop_path }}');
          }
        </v-style>
        <div class="movie-content">
          <div class="frame small">
            <div class="movie-content-poster">
              <img class="movie-content-poster__img" :srcSet="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + tvshow.poster_path + ' 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + tvshow.poster_path + ' 2x'" :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + tvshow.poster_path" :alt="tvshow.original_name + 'poster'" />
            </div>
            <div class="movie-content-header">
              <h1 class="movie-content-header__title">{{ tvshow.original_name }} <span class="movie-content-header__title--year"> ({{ tvshow.first_air_date | year }})</span></h1>
              <div class="movie-content-header-row">
                <div class="gauge">
                  <svg class="gauge-svg" width="68px" height="68px">
                    <circle class="gauge-svg-circle-bg" cx="34" cy="34" r="30px" stroke-dasharray="300, 20000"></circle>
                    <circle :class="{'high': tvshow.vote_average > 7,'medium':tvshow.vote_average <= 7 && tvshow.vote_average > 5, 'low':tvshow.vote_average <= 5}" class="gauge-svg-circle" cx="34" cy="34" r="30px" :stroke-dasharray="stroke + ', 20000'"></circle>
                  </svg>
                  <span class="gauge__score">{{ tvshow.vote_average * 10 }}</span>
                  <span class="gauge__title">User score</span>
                </div>
                <div>
                  <div class="main-credit">
                    <div>
                      <h4>Creator: </h4><router-link :to="'/person/' + creator.id" v-for="creator in tvshow.created_by" :key="creator.name">{{ creator.name }}</router-link>
                    </div>
                  </div>
                  <div class="genres">
                    <h4>Genres:</h4>
                    <ul class="genres-list">
                      <li class="genres-list-item" :key="genre.id" v-for="genre in tvshow.genres">{{ genre.name }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3>Overview</h3>
                <p class="movie-content-header__intro">{{ tvshow.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="movie-cast">
          <div class="frame">
            <h2>Main Cast</h2>
            <div class="casts">
              <person-card :key="cast.name" v-for="cast in this.credit.cast.slice(0, 5)" :id="cast.id" :name="cast.name" :character="cast.character" :photo="cast.profile_path"></person-card>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
import PersonCard from './PersonCard.vue'

export default {
  data () {
    return {
      id: this.$route.params.id,
      tvshow: null,
      credit: null,
      stroke: 0,
      director: 'Director',
      screenplay: 'Screenplay',
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/tv/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&append_to_response=credits')
      .then(response => {
        this.tvshow = response.data
        this.credit = response.data.credits
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
        setTimeout(() => {
          this.stroke = 184 * this.tvshow.vote_average * 0.1
        }, 300)
      })
  },
  components: {
    PersonCard
  },
  methods: {
    searchjob: function (job) {
      return this.credit.crew.filter(function (crew) {
        return crew.job === job
      })
    }
  },
  filters: {
    year: function (value) {
      return value.substring(0, 4)
    }
  }
}
</script>
