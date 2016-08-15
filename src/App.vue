<template>
  <div id="app" class="container">
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
      console.log('parent is telling children to search for: ' + terms)
      this.$broadcast('runSearch', terms)
    }
  }
}
</script>

<style lang="scss">
  #app {
    margin-top:2em;
  }
</style>
