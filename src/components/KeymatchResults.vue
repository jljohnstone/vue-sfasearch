<template>
  <div class="keymatch-result" v-show="count">
    <div class="keymatch-result-item">
      <div class="keymatch-result-item-button">
        <a href="{{ keymatch.url }}" class="btn">{{ keymatch.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keymatch: '',
      count: 0
    }
  },
  props: ['terms'],
  events: {
    runSearch (terms) {
      this.terms = terms
      var searchURI = 'static/data/keymatch.json'
      this.$http.get(searchURI).then((response) => {
        var allTerms = response.data.keymatches
        for (var i = 0; i < allTerms.length; i++) {
          var thisTerm = allTerms[i]
          if (thisTerm.term.toLowerCase() === terms.toLowerCase()) {
            this.$set('keymatch', thisTerm)
            this.$set('count', 1)
            return
          } else {
            this.$set('keymatch', '')
            this.$set('count', 0)
          }
        }
        this.$dispatch('searchComplete', 'keymatch')
      }, (response) => {
        console.error('error fetching keymatch results JSON')
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/app";
  .keymatch-result {
    @include outer-container;
    @extend .outer-container-padding;
  }
  .keymatch-result-item {
    @include row();
    margin-top:rem(40)
  }
  .keymatch-result-item-button {
    @include span-columns(12);
    @include media($medium-up) {
      @include span-columns(8 of 12)
    }
    .btn {
      color:#333;
    }
  }
</style>
