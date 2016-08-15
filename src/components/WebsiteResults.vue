<template>
  <div class="website-results">
    <h2>Website Results</h2>
    <p>Websites containing: {{ terms }}</p>
    <ol>
      <li v-for="entry in website.results">
        <p>
          <strong>
            <a href="{{ entry._source.url }}">{{ entry._source.title }}</a>
          </strong>
        </p>
      </li>
    </ol>
  </div>
</template>


<script>
export default {
  data () {
    return {
      website: ''
    }
  },
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      console.log('website search for: ' + this.terms)
      var searchURI = 'http://library.sfasu.edu/api/search/sfasu/json?q=' + this.terms
      this.$http.jsonp(searchURI).then((response) => {
        this.$set('website', response.json())
      }, (response) => {
        console.log('error')
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
