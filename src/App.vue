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
      var initialTerms = this.getParameterByName('q')
      this.$set('terms', initialTerms)
      console.log(this.terms ? 'initial terms present' : 'no initial terms')
      if (this.terms) {
        this.runInitialSearch()
      }
    },
    methods: {
      getParameterByName (name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        var results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
      },
      runInitialSearch () {
        this.performSearch(this.terms)
      },
      performSearch (keywords) {
        this.$broadcast('runSearch', keywords)
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
    font-family: $lucida-grande;
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
