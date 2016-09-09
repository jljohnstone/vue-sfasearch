<template>
  <div class="search-wrapper">
    <div class="search-form-container">
      <div class="search-form">
        <form @submit.prevent="requestSearch">
          <input type="text" aria-label="Search Terms" v-model="terms">
          <button type="submit" class="search-btn">Search</button>
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
    vertical-align: top;
    input {
      @include span-columns(8);
      @include media($medium-up) {
        @include span-columns(4);
      }
    }
    button {
      @include span-columns(4);
      @include media($medium-up) {
        @include span-columns(2);
      }
    }
  }
  .search-btn {
    padding:rem(5) rem(15);
    background:#fff;
    border:0 none;
    cursor:pointer;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    &:hover {
      background:shade($gray, 10%);
    }
  }
  .terms {
    @include outer-container;
    h1 {
      font-weight:normal;
      font-size:1.3em;
    }
  }
</style>
