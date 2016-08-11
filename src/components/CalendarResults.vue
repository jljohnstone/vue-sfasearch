<template>
  <div class="calendar-results">
    <h2>Calendar Results</h2>
    <p>Events called: {{ terms }}</p>
  </div>
</template>


<script>
export default {
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      console.log('calendar search for: ' + this.terms)
    }
  }
}
</script>


<style scoped>

</style>
