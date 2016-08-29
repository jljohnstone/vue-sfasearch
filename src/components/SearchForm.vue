<template>
  <div class="search-wrapper">
    <div class="search-form-container">
      <div class="search-form">
        <form @submit.prevent="requestSearch">
          <input type="text" aria-label="Search Terms" v-model="terms">
          <button type="submit" class="">Search</button>
        </form>
      </div>
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
    padding-top: rem(20);
    padding-bottom: rem(20);
  }
  .search-form {
    @include outer-container;
    @extend .outer-container-padding;
  }
  form {
    @include span-columns(6);
  }
  .terms {
    @include outer-container;
    h1 {
      font-weight:normal;
      font-size:1.3em;
    }
  }
</style>
