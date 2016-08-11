<template>
  <div id="app">
    <search-form @new-search="performNewSearch"></search-form>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm'

export default {
  components: {
    SearchForm
  },
  methods: {
    performNewSearch (terms) {
      console.log('parent is handling search for: ' + terms)
    }
  }
}
</script>

<style>

</style>
