<template>
  <div id="app" class="">
    <search-form @new-search="performSearch" :terms="terms"></search-form>
    <directory-results :terms="terms"></directory-results>
    <calendar-results :terms="terms"></calendar-results>
    <website-results :terms="terms"></website-results>
  </div>
</template>

<script>
  import SearchForm from './components/SearchForm'
  import DirectoryResults from './components/DirectoryResults'
  import CalendarResults from './components/CalendarResults'
  import WebsiteResults from './components/WebsiteResults'

  import queryString from 'query-string'

  export default {
    data () {
      return {
        terms: null
      }
    },
    components: {
      SearchForm,
      DirectoryResults,
      CalendarResults,
      WebsiteResults
    },
    ready () {
      var qs = queryString.parse(window.location.search)
      this.$set('terms', qs.q)
      console.log(this.terms ? 'initial terms present' : 'no initial terms')
      if (this.terms) {
        this.runInitialSearch()
      }
    },
    methods: {
      runInitialSearch () {
        this.performSearch(this.terms)
      },
      performSearch (keywords) {
        this.$broadcast('runSearch', keywords)
        // TODO: update query string without causing an infinite search loop
        // var parsed = queryString.parse(window.location.search)
        // console.log(parsed)
        // parsed.q = keywords
        // var stringified = queryString.stringify(parsed)
        // window.location.search = stringified
      }
    },
    events: {
      searchComplete (type) {
        console.log(type + ' search complete')
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/app";
  body {
    margin:0;
  }
  #app {
    margin-top:rem(100)
  }
  a {
    color: $purple;
    text-decoration:none;
  }
  h2 {
    font-weight: normal;
    margin-bottom:0.5rem;
  }
</style>
