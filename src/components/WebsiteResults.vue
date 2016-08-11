<template>
  <div class="website-results">
    <h2>Website Results</h2>
    <p>Websites containing: {{ terms }}</p>
  </div>
</template>


<script>
export default {
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      console.log('website search for: ' + this.terms)
    }
  }
}
</script>


<style scoped>

</style>
