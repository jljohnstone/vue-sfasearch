<template>
  <div class="directory-results">
    <h2>Directory Results</h2>
    <p>People named: {{ terms }}</p>
    <div v-show="results">
      <ul>
        <li v-for="person in directory.results">{{ person._source.fullname }}</li>
      </ul>
    </div>
    <div v-else>
      no results
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      directory: ''
    }
  },
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      console.log('directory search for: ' + this.terms)
      var searchURI = ('http://library.sfasu.edu/api/search/directory/json?q=' + this.terms)
      this.$http.jsonp(searchURI).then((response) => {
        this.$set('directory', response.json())
      }, (response) => {
        console.log('error')
      })
    }
  }
}
</script>


<style scoped>

</style>
