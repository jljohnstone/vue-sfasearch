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
  #app {
    margin-top:2em;
  }
</style>
