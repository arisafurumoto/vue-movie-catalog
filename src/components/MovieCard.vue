<template>
  <li class="movies-list-item">
    <router-link class="movies-list-item-link" :to="'/movie/' + id">
      <div class="movies-list-item__poster-wrap">
        <img class="movies-list-item__poster" :title="title" :srcSet="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + poster + ' 1x, https://image.tmdb.org/t/p/w370_and_h556_bestv2' + poster + '2x'" :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + poster" />
      </div>
      <span class="movies-list-item__title">{{title}}</span>
      <span class="movies-list-item__date">{{releasedate | year-month}}</span>
      <span class="movies-list-item__score" :class="{high: voteaverage > 7,medium:voteaverage <= 7 && voteaverage > 5, low:voteaverage <= 5}">{{ voteaverage * 10 }}%</span>
    </router-link>
  </li>
</template>
<script>
export default {
  props: ['id', 'title', 'poster', 'releasedate', 'voteaverage']
}
</script>
<style lang="scss">
</style>
