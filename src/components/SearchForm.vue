<template>
  <div class="search-wrapper">
    <div class="search-form-container">
      <div class="search-form">
        <form @submit.prevent="requestSearch">
          <input type="text" v-model="terms">
          <button type="submit" class="button">Search</button>
        </form>
      </div>
    </div>
    <div class="terms" v-show="terms">
      <p>
        Results for <strong>{{ terms }}</strong>
      </p>
    </div>
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

<style lang="scss">
  @import "../assets/scss/app";
  .search-wrapper {
    @include row();
  }
  .search-form-container {
    background-color: $gray;
    border-bottom: rem(5) solid shade($gray, 10%);
    // margin-top: rem(100);
    padding-top: rem(20);
    padding-bottom: rem(20);
  }
  .search-form {
    @include outer-container;
  }
  form {
    @include span-columns(6);
  }
  .terms {
    @include outer-container;
  }
</style>
