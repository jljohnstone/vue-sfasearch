<template>
  <div class="website-results">
    <h2>Website Results</h2>
    <ol class="website-results-list">
      <li v-for="entry in website.results" class="website-result">
        <div class="result-title">
          <a href="{{ entry._source.url }}">{{ entry._source.title }}</a>
        </div>
        <div class="result-url">
          {{ entry._source.url }}
        </div>
        <div class="result-body">
          {{{ entry.highlight.body }}}
        </div>
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
      var searchURI = 'http://library.sfasu.edu/api/search/sfasu/json?q=' + this.terms
      this.$http.jsonp(searchURI).then((response) => {
        this.$set('website', response.json())
        this.$dispatch('searchComplete', 'website')
      }, (response) => {
        console.log('error')
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/app";
  .website-results {
    @include outer-container;
  }
  .website-results-list {
    padding:0;
  }
  .website-result {
    @include span-columns(8 of 12)
    // margin-bottom:2em;
    .result-title {
      font-size:1.2rem;
    }
    .result-body {
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      em {
        font-style: normal;
      }
    }
    .result-url {
      color: green;
      font-size: 0.9rem;
    }
  }
</style>
