<template>
  <div class="directory-results">
    <h2>Directory Results</h2>
    <p>Results for: {{ terms }}</p>
    <ul>
      <li v-for="person in directory.results">
        {{ person._source.fullname }}
        <ul>
          <li>{{ person._source.role }} - {{ person._source.department }}</li>
          <li>phone: {{ person._source.phone }}</li>
          <li>email: {{ person._source.email }}</li>
        </ul>
      </li>
    </ul>
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
      var searchURI = 'http://library.sfasu.edu/api/search/directory/json?q=' + this.terms
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
