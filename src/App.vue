<template>
  <div>
    <header>
      <div class="frame">
        <router-link :to="'/'"><img src="./assets/logo.svg"/></router-link>
        <router-link :to="'/movie'">Movies</router-link>
        <router-link :to="'/tvshow'">TV Shows</router-link>
        <router-link :to="'/person'">People</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
html{
  background-color:#081B23;
  color:#fff;
  font-family:"Roboto",Arial, Helvetica, sans-serif;
  overflow-x:hidden;
}

body{
  overflow-x:hidden;
  margin: 0;
  padding-top: 84px;
  min-height: 95vh;
}

header {
  background: radial-gradient(circle at top right, #031D2B 0%, #052A31 25%, #0c7d56 100%);
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top:0;
  z-index: 100;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  .frame {
    align-items: center;
    display: flex;
  }

  a {
    font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
    display: inline-block;
    color: #fff;
    margin-right: 30px;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    opacity: 0.9;
    transition: opacity .3s ease-in-out;

    &:first-child:before {
      display: none;
    }

    &:before {
      position: absolute;
      height:2px;
      width: 0;
      background-color: #fff;
      bottom: -5px;
      content: "";
      left:0;
      right:0;
      border-radius: 2px;
      transition: width .3s ease-in-out;
      opacity:0.7;
      margin: auto;
    }

    &:hover{
      opacity: 1;

      &:before{
        width:100%;
      }
    }
  }

  img {
    width: 50px;
    margin-top: 5px;
  }
}

h1,h2,h3{
  font-family:"Source Sans Pro", Arial, Helvetica, sans-serif;
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
