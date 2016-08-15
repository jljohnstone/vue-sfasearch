<template>
  <div class="directory-results">
    <h2>Directory Results</h2>
    <p>{{ directory.total }} results for: {{ terms }}</p>
    <div class="people" v-show="directory.total">
      <div v-for="person in directory.results" class="person">
        <div class="">
          <div class="photo">
            <img :src="person._source.image" :alt="person._source.fullname">
          </div>
          <ul class="details">
          <li>
            {{ person._source.fullname }}
          </li>
          <li>
            {{ person._source.role }} - {{ person._source.department }}
          </li>
          <li>
            phone: {{ person._source.phone }}
          </li>
          <li>
            email: {{ person._source.email }}
          </li>
        </ul>
        </div>
      </div>
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
      var searchURI = 'http://library.sfasu.edu/api/search/directory/json?q=' + this.terms
      this.$http.jsonp(searchURI).then((response) => {
        this.$set('directory', response.json())
        this.$dispatch('searchComplete', 'directory')
      }, (response) => {
        console.log('error')
      })
    }
  }
}
</script>


<style scoped lang="scss">

</style>
