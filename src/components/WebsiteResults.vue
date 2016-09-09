<template>
  <div class="website-results" v-show="count">
    <h2>Website Results</h2>
    <ol class="website-results-list">
      <li v-for="entry in website.hits.hits" class="website-result">
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
      website: '',
      count: 0
    }
  },
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      var searchURI = 'http://library.sfasu.edu/api/sfa/website?cache=true&size=100&q=' + this.terms
      this.$http.get(searchURI).then((response) => {
        this.$set('website', response.json())
        this.$dispatch('searchComplete', 'website')
        this.$set('count', this.website.hits.total)
      }, (response) => {
        console.error('error fetching website results JSON')
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/app";
  .website-results {
    @include outer-container;
    @extend .outer-container-padding;
  }
  .website-results-list {
    @include row();
  }
  .website-result {
    @include span-columns(12);
    @include media($medium-up) {
      @include span-columns(8 of 12)
    }
    .result-title {
      font-size:1.2rem;
    }
    .result-body {
      color:#333;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .result-url {
      color: green;
      font-size: 0.9rem;
    }
  }
</style>
