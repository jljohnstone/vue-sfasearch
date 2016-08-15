<template>
  <div class="search-form row">
    <form @submit.prevent="requestSearch" class="small-12 large-6">
      <input type="text" v-model="terms">
      <button type="submit">Search</button>
    </form>
    <p class="small-12 large-6">
      <strong>
        Terms: {{ terms }}
      </strong>
    </p>
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
