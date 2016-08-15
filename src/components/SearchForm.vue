<template>
  <div class="search-form row">
    <form @submit.prevent="requestSearch" class="col-xs-12 col-sm-8 col-lg-6">
      <input type="text" v-model="terms">
      <button type="submit">Search</button>
    </form>
    <p class="col-xs-12 col-sm-4 col-lg-6">
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
