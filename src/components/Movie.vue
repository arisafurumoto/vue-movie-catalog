<template>
  <div>
    <div v-show="loading" class="loader"></div>
    <div v-if="!loading">
      <section class="movie">
        <v-style>
          .movie-content:before {
            background-image: url('https://image.tmdb.org/t/p/original{{ movie.backdrop_path }}');
          }
        </v-style>
        <div class="movie-content">
          <div class="frame small">
            <div class="movie-content-poster">
              <img class="movie-content-poster__img" :srcSet="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path + ' 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path + ' 2x'" :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path" :alt="movie.title + 'poster'" />
            </div>
            <div class="movie-content-header">
              <h1 class="movie-content-header__title">{{ movie.title }} <span class="movie-content-header__title--year"> ({{ movie.release_date | year }})</span></h1>
              <div class="movie-content-header-row">
                <div class="gauge">
                  <svg class="gauge-svg" width="68px" height="68px">
                    <circle class="gauge-svg-circle-bg" cx="34" cy="34" r="30px" stroke-dasharray="300, 20000"></circle>
                    <circle :class="{'high': movie.vote_average > 7,'medium':movie.vote_average <= 7 && movie.vote_average > 5, 'low':movie.vote_average <= 5}" class="gauge-svg-circle" cx="34" cy="34" r="30px" :stroke-dasharray="stroke + ', 20000'"></circle>
                  </svg>
                  <span class="gauge__score">{{ movie.vote_average * 10 }}</span>
                  <span class="gauge__title">User score</span>
                </div>
                <div>
                  <div class="main-credit">
                    <div>
                      <h4>Director: </h4><router-link :to="'/person/' + crew.id" v-for="crew in searchjob('Director')" :key="crew.name">{{ crew.name }}</router-link>
                    </div>
                    <div v-if="searchjob('Screenplay').length">
                      <h4>Writers: </h4><span v-for="crew in searchjob('Screenplay')" :key="crew.name">{{ crew.name }}</span>
                    </div>
                  </div>
                  <div class="genres">
                    <h4>Genres:</h4>
                    <ul class="genres-list">
                      <li class="genres-list-item" :key="genre.id" v-for="genre in movie.genres">{{ genre.name }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3>Overview</h3>
                <p class="movie-content-header__intro">{{ movie.overview }}</p>
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
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PersonCard from './PersonCard.vue'

export default {
  data () {
    return {
      id: this.$route.params.id,
      movie: null,
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
      .get('https://api.themoviedb.org/3/movie/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&append_to_response=credits')
      .then(response => {
        this.movie = response.data
        this.credit = response.data.credits
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false
        setTimeout(() => {
          this.stroke = 184 * this.movie.vote_average * 0.1
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
<style lang="scss">
  .movie{
    padding-bottom: 50px;
    &-content{
      overflow: hidden;
      padding: 50px 20px;
      position: relative;

      &:before{
        background-position: center 20%;
        background-size: cover;
        z-index: -2;
      }

      &:after{
        background-color: #288247;
        mix-blend-mode: multiply;
        z-index: -1;
      }

      &:before,&:after{
        content: "";
        left: 0;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .frame {
        display: flex;
        align-items: center;

        @media(max-width:768px) and (min-width: 600px){
          align-items: flex-start;
        }
      }

      &-poster {
        margin-right: 25px;

        @media(max-width:599px){
          display: none;
        }
        &__img {
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

          @media(max-width:768px) and (min-width: 600px){
            width: 150px;
          }
        }
      }

      &-header {
        &__title {
          margin-top: 0;

          &--year {
            font-weight: normal;
            opacity: 0.8;
          }
        }

        &__intro {
          line-height: 24px;
        }

        &-row {
          display: flex;
        }

        h4 {
          font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
          font-weight: bold;
          margin:0 0 15px;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
  }
  .gauge {
    position: relative;
    margin-bottom: 35px;

    &-svg {
      &-circle {
        fill: none;
        stroke-width: 8;
        stroke-linecap: round;
        transform-origin: center;
        transform: rotate(-90deg);
        transition: stroke-dasharray .5s ease-in-out;

        &.high{
          stroke: #02D277;
        }

        &.medium{
          stroke: #6f1cd8;
        }

        &.low{
          stroke: #D0235B;
        }

        &-bg {
          stroke: #6e6e6e;
          stroke-width: 8;
          opacity: 0.7
        }
      }
    }

    &__score {
      font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
      font-weight: bold;
      font-size: 30px;
      position: absolute;
      left: 18px;
      top: 14px;
    }

    &__title {
      font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
      font-weight: bold;
      display: block;
      text-transform: uppercase;
      font-size: 13px;
      margin-top: 3px;
      text-align: center;
    }
  }
  .genres {
    margin-left: 30px;

    &-list {
      list-style: none;
      display: inline-block;
      padding: 0;
      margin: 0;

      &-item {
        font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
        background-color: rgba(#288247,0.7);
        padding: 5px 10px;
        font-size: 13px;
        border-radius: 7px;
        font-weight: bold;
        display: inline-block;
        margin: 5px 10px 5px 0;
      }
    }
  }
  .main-credit {
    margin-left: 30px;

    a {
      color: #fff;
      text-decoration: none;

      &:hover,&:focus {
        text-decoration: underline;
      }
    }

    a:after {
      content: ", ";
    }

    a:last-child {
      &:after {
        content: "";
      }
    }
  }
</style>
