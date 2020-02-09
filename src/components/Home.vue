<template>
  <div>
    <section class="logo-wrap">
        <img class="logo" src="../assets/logo.svg" alt="The Movie DB logo" />
    </section>
    <section>
      <div class="frame">
        <search></search>
      </div>
    </section>
  </div>
</template>
<script>
import Search from './Search.vue'
export default {
  components: {
    Search
  }
}
</script>
