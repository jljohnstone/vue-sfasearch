<template>
  <div class="directory-results">
    <h2>Directory Results</h2>
    <p>People named: {{ terms }}</p>
  </div>
</template>


<script>
export default {
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      console.log('directory search for: ' + this.terms)
    }
  }
}
</script>


<style scoped>

</style>
