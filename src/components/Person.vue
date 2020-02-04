<template>
    <div class="person">
        <div class="small frame">
            <img :src="'https://image.tmdb.org/t/p/w276_and_h350_face' + person.profile_path">
            <div>
                <h1>{{ person.name }}</h1>
                <span>Born: {{ person.birthday }}</span>
                <span>Place of Birth: {{ person.place_of_birth }}</span>
                <h3>Biography</h3>
                <p>{{ person.biography }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      id: this.$route.params.id,
      person: null
    }
  },
  mounted () {
    axios
      .get('https://api.themoviedb.org/3/person/' + this.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US')
      .then(response => (this.person = response.data))
  }
}
</script>
<style lang="scss">

</style>
