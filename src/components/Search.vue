<template>
  <div class="search">
    <div class="search-form" :class="{short:category == 'Movies' || category == 'People', long:category == 'TV Shows'}">
      <label class="search-label visually-hidden" for="search">
        <span>Search</span>
      </label>
      <select v-if="!category" v-model="catoption">
        <option value="movie" selected>Movies</option>
        <option value="tvshow">TV Shows</option>
        <option value="person">People</option>
      </select>
      <i v-if="!category" class="fas fa-chevron-down"></i>
      <div v-if="category" class="search-category">{{ category }}</div>
      <input id="search" type="text" autocomplete="off" name="search" placeholder="Search" v-model="keyword" @keydown="autocomplete" @keydown.enter="search">
      <button class="button" ref="button" type="button" value="Search" @click="search"><i class="fas fa-search"></i></button>
    </div>
    <ul class="autocomplete" v-closable="{exclude: ['button'], handler:'close'}" v-show="showcomplete">
      <li v-for="option in options" :key="option.id" class="autocomplete-item">
        <a v-if="option.media_type=='movie'" :href="'/movie/' + option.id">
          <i class="fas fa-film"></i>
          {{ option.title }}
        </a>
        <a v-if="option.media_type=='tv'" :href="'/tvshow/' + option.id">
          <i class="fas fa-tv"></i>
          {{ option.original_name }}
        </a>
        <a v-if="option.media_type=='person'" :href="'/person/' + option.id">
          <i class="fas fa-user"></i>
          {{ option.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      keyword: '',
      catoption: 'movie',
      options: null,
      loading: true,
      errored: false,
      showcomplete: false
    }
  },
  props: ['category'],
  filters: {
    categoryConvert: function (value) {
      if (value === 'Movies') {
        return 'movie'
      } else if (value === 'TV Shows') {
        return 'tvshow'
      } else {
        return 'person'
      }
    }
  },
  methods: {
    close: function () {
      this.options = []
      this.showcomplete = false
    },
    autocomplete: function (event) {
      if (this.keyword.length > 2 && event.key !== 'Enter') {
        this.showcomplete = true
        axios
          .get('https://api.themoviedb.org/3/search/multi?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&query=' + this.keyword + '&page=1&include_adult=false')
          .then(response => {
            response.data.results.sort(function (a, b) {
              return b.popularity - a.popularity
            })
            this.options = response.data.results.slice(0, 8)
          }).catch(error => {
            console.log(error)
            this.errored = true
          }).finally(() => {
            this.loading = false
            this.showcomplete = true
          })
      } else {
        this.close()
      }
    },
    search: function () {
      this.close()
      if (this.category) {
        this.$router.push('/' + this.$options.filters.categoryConvert(this.category) + '?search=' + this.keyword)
      } else {
        this.$router.push('/' + this.catoption + '?search=' + this.keyword)
      }
    }
  }
}
</script>
<style lang="scss">
.search {
  margin:auto;
  max-width:650px;
  transform: translateY(-40px);
  position:relative;
  z-index: 5;

  &-form {
    position:relative;

    &.short{
      input[type=text] {
        padding-left: 85px;
      }
    }

    &.long {
      input[type=text] {
        padding-left: 105px;
      }
    }
  }

  &-category {
    position:absolute;
    line-height: 44px;
    color: #009e40;
    background-color: rgba(#02D277, 0.1);
    border: 0;
    border-radius: 50% 0 0 50%;
    font-size:14px;
    padding: 0 15px;
  }

  input[type=text] {
    border:0;
    border-radius:25px;
    box-sizing:border-box;
    color:#02D277;
    font-size:1rem;
    outline:none;
    padding:13px 16px 13px 125px;
    width:100%;

    &:focus {
      box-shadow:0px 0px 4px 2px #02D277;
    }

    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &::-ms-input-placeholder,
    &::placeholder {
      color:#02D277;
      opacity:1;
    }
  }

  .fa-chevron-down {
    position: absolute;
    color: #009e40;
    top: 50%;
    transform: translateY(-30%);
    left: 90px;
    font-size: 12px;
    pointer-events: none;
  }

  select {
    position:absolute;
    appearance: none;
    line-height: 44px;
    color: #009e40;
    background-color: rgba(#02D277, 0.1);
    border: 0;
    border-radius: 50% 0 0 50%;
    font-size:14px;
    padding: 0 30px 0 15px;

    &::-ms-expand {
      display: none;
    }
  }

  button[type=button] {
    background-color: transparent;
    border:0;
    color:transparent;
    height:44px;
    padding:0;
    position:absolute;
    right:0;
    top:0;
    width:44px;
    border-radius: 0% 50% 50% 0;
    cursor: pointer;
    transition: background-color .3s ease-in-out;

    &:hover,&:focus {
      background-color: rgba(#02D277, 0.15);
    }

    i {
      color:#02D277;
      font-size: 20px;
    }
  }

  .autocomplete {
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    overflow: hidden;
    top: 55px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    &-item {
      &:nth-child(even){
        a{
          background-color: #eee;
        }
      }

      a {
        color: #080808;
        text-decoration: none;
        height: 44px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 10px 20px;
        transition: all 0.2s ease-in-out;

        &:hover,&:focus {
          background-color: rgba(#02D277, 0.15);
          color:#009e40;
        }

        i {
          margin-right:15px;

          &.fa-film, &.fa-user {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
