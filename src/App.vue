<template>
  <div id="app">
    <section class="logo-wrap">
      <img class="logo" src="./assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue'

export default {
  name: 'app',
  components: {
    MovieList
  }
}
</script>

<style lang="scss">
html{
  background-color:#081B23;
  color:#E3F4FC;
  font-family:"Roboto",Arial, Helvetica, sans-serif;
  overflow-x:hidden;
}

body{
  overflow-x:hidden;
}

h1,h2{
  font-family:"PT Sans Caption", Arial, Helvetica, sans-serif;
}

h1{
  font-size: 2.6875em;

  @media(max-width:64em) and (min-width:48.01em){
    font-size: 2.375em;
  }

  @media(max-width:48em){
    font-size:1.875rem;
  }
}

h2{
  font-size:2.1875rem;

  @media(max-width:64em) and (min-width:48.01em){
    font-size:1.875rem;
  }

  @media(max-width:48em){
    font-size:1.375rem;
  }
}

.frame{
  box-sizing:border-box;
  margin:auto;
  max-width:1180px;
  padding:0 15px;
  position: relative;

  &.small{
    max-width:1000px;
  }
}

.visually-hidden{
  border: 0;
  clip: rect(1px 1px 1px 1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.center{
  text-align: center;
}

.home{
  background: radial-gradient(800px at top, #063852 0%,#081b23 60%);

  @media(max-width:40.5625em){
    background: radial-gradient(400px at top, #063852 0%,#081b23 60%);
  }
}

.logo{
  display:block;
  margin:0 auto;
  padding:120px 0 180px;
  width:180px;

  @media(max-width:64em) and (min-width:40.5626em){
    width:150px;
  }

  @media(max-width:40.5625em){
    padding:60px 0 100px;
    width:66px;
  }

  &-wrap{
    background-image: url("./assets/bg.svg");
    background-size: auto 110%;
    background-repeat: no-repeat;
    background-position: center -60px;

    @media(max-width:64em) and (min-width:40.5626em){
      background-size: auto 100%;
      background-position: center -50px;
    }

    @media(max-width:40.5625em){
      background-size: auto 100%;
      background-position: center -30px;
    }
  }
}
</style>
