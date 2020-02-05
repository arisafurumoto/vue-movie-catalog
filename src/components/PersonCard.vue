<template>
  <div class="card">
    <router-link class="card-link" :to="'/person/' + id">
      <div class="card-media">
        <img v-if="photo !== null" class="card__img" :src="'https://image.tmdb.org/t/p/w276_and_h350_face' + photo">
        <i class="fas fa-user"></i>
      </div>
      <div class="card-content">
        <span class="card-content__title">{{ name }}</span>
        <span v-if="character" class="card-content__title--sub">as "{{ character }}"</span>
        <span v-if="knowntv" class="card-content__title--sub">"{{ knowntv }}"</span>
        <span v-if="knownmovie" class="card-content__title--sub">"{{ knownmovie }}"</span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['id', 'name', 'character', 'photo', 'knowntv', 'knownmovie']
}
</script>
<style lang="scss">
.casts {
  display: flex;
  flex-wrap: wrap;
}
.card {
  flex-basis: 18%;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-right: 2.5%;

  @media(min-width:835px){
    &:nth-child(5n + 5) {
      margin-right: 0;
    }
  }

  @media(max-width:834px) and (min-width:600px){
    flex-basis: 23%;
    margin-right: 2.6%;

    &:nth-child(4n + 4) {
      margin-right: 0;
    }
  }

  @media(max-width:599px) and (min-width:320px){
    flex-basis: 48%;
    margin-right: 4%;

    &:nth-child(2n + 2) {
      margin-right: 0;
    }
  }

  &-link{
    text-decoration: none;

    &:hover,&:focus {
      .card__img {
        opacity:0.15;
      }
    }
  }

  &__img {
    position: absolute;
    width: 100%;
    top:0;
    z-index: 1;
    transition: opacity .25s ease-in-out;
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

  &-media {
    background:radial-gradient(circle at top right, #029e67 0%,#052A31 70%,#031D2B 100%);
    position: relative;
    padding-top: 127%;

    i {
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

</style>
