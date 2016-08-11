<template>
  <form @submit="requestSearch">
    <input type="text" v-model="terms">
    <button type="submit">Search</button>
  </form>
  <p><strong>Terms: {{ terms }}</strong></p>
</template>


<script>
export default {
  data () {
    return {
      terms: 'scott'
    }
  },
  methods: {
    requestSearch (e) {
      e.preventDefault()
      this.$dispatch('new-search', this.terms)
    }
  }
}
</script>


<style scoped>

</style>
