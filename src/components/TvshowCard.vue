<template>
    <router-link class="movies-list-item-link" :to="'/tvshow/' + id">
      <div class="movies-list-item__poster-wrap">
        <i class="fas fa-tv"></i>
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
