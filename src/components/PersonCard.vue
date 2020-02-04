<template>
  <div class="card">
    <router-link class="card-link" :to="'/person/' + id">
      <img class="card__img" :src="'https://image.tmdb.org/t/p/w276_and_h350_face' + cast.profile_path">
      <div class="card-content">
        <span class="card-content__title">{{ name }}</span>
        <span class="card-content__title--sub">as "{{ character }}"</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      cast: null
    }
  },
  props: ['id', 'name', 'character'],
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/person/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US')
      .then(response => (this.cast = response.data))
  }
}
</script>
<style lang="scss">
.card {
  flex-basis: 13%;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-right: 1.5%;

  &:nth-child(7n) {
    margin-right: 0;
  }

  @media(max-width:1150px) and (min-width:835px){
    flex-basis: 18%;
    margin-right: 2.5%;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  @media(max-width:834px) and (min-width:600px){
    flex-basis: 23%;
    margin-right: 2.6%;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media(max-width:599px) and (min-width:320px){
    flex-basis: 48%;
    margin-right: 4%;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  &-link{
    text-decoration: none;
  }

  &__img {
    width: 100%;
  }

  &-content {
    color: #081B23;
    padding: 10px 15px;

    &__title {
      font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
      display: block;
      font-weight: bold;

      &--sub {
        display: block;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}

</style>
