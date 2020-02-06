<template>
  <router-link class="movies-list-item-link" :to="'/movie/' + id">
    <div class="movies-list-item__poster-wrap">
      <i class="fas fa-film"></i>
      <img v-if="poster" class="movies-list-item__poster" :title="title" :src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + poster" />
    </div>
    <span v-if="title" class="movies-list-item__title">{{title}}</span>
    <span v-if="releasedate" class="movies-list-item__date">{{releasedate | year-month}}</span>
    <span v-if="voteaverage" class="movies-list-item__score" :class="{high: voteaverage > 7,medium:voteaverage <= 7 && voteaverage > 5, low:voteaverage <= 5}">{{ voteaverage * 10 }}%</span>
  </router-link>
</template>
<script>
export default {
  props: ['id', 'title', 'poster', 'releasedate', 'voteaverage']
}
</script>
<style lang="scss">
.movies{
  margin-top:45px;

  &-list{
    display:flex;
    flex-wrap:wrap;
    list-style: none;
    margin:0 0 50px 0;
    padding:0;
    width: 100%;

    &-item{
      position:relative;
      flex-basis: 18%;
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

        &:hover,&:focus{
          .movies-list-item__poster{
            opacity:0.15;
          }
        }
      }

      &__poster{
        display:block;
        max-width: 100%;
        position:absolute;
        top:0;
        transition: opacity .25s ease-in-out;
        z-index: 1;

        &-wrap{
          background:radial-gradient(circle at top right, #029e67 0%,#052A31 70%,#031D2B 100%);
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
          border-radius: 8px;
          margin:10px 0;
          overflow: hidden;
          padding-top:150.27%;
          position:relative;

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

      &__title{
        color:#FFF;
        display:block;
        font-size: 1rem;
        margin:15px 0 10px;
      }

      &__date{
        color:#A1D1E5;
        display:block;
        font-size: 0.875rem;
        margin:10px 0 20px;
      }

      &__score{
        border-radius:8px;
        color:#FFF;
        display:block;
        font-size: 0.75rem;
        line-height: 20px;
        left:5px;
        position: absolute;
        text-align: center;
        top:14px;
        width:40px;
        z-index: 2;

        &.high{
          background-color: #02D277;
        }

        &.medium{
          background-color: #4902A2;
        }

        &.low{
          background-color: #D0235B;
        }
      }
    }
  }
}
</style>
