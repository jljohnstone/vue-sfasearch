<template>
  <div class="search-form">
    <form @submit.prevent="requestSearch">
      <input type="text" v-model="terms">
      <button type="submit">Search</button>
    </form>
    <p><strong>Terms: {{ terms }}</strong></p>
  </div>
</template>


<script>
export default {
  props: ['terms'],
  methods: {
    requestSearch () {
      this.$dispatch('new-search', this.terms)
    }
  }
}
</script>


<style scoped>

</style>
