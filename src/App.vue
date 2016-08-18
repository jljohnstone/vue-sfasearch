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

// import $ from 'jquery'
// import foundation from 'foundation-sites'

export default {
  data () {
    return {
      terms: ''
    }
  },
  components: {
    SearchForm,
    DirectoryResults,
    CalendarResults,
    WebsiteResults
  },
  methods: {
    performSearch (terms) {
      this.$broadcast('runSearch', terms)
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
</style>
