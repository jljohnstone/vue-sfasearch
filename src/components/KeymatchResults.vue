<template>
  <div class="keymatch-result" v-show="count">
    <h2>Suggested Result</h2>
    <div class="keymatch-result-item">
      <a href="{{ keymatch.url }}" onclick="_gaq.push(['_trackEvent', 'sfa-search', 'keymatch-click', '{{ terms }} - {{ keymatch.url }}']);">
        <img src="~assets/logo-small.png">
        <div class="result-text">
          <div class="result-title">
            {{ keymatch.title }}
          </div>
          <div class="result-url">
            {{ keymatch.url }}
          </div>
        </div>
      </a>
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
        this.fetchSearchResults()
      }
    },
    methods: {
      fetchSearchResults () {
        var searchURI = 'static/data/keymatch.json'
        this.$http.get(searchURI).then((response) => {
          var allTerms = response.body.keymatches
          for (var i = 0; i < allTerms.length; i++) {
            var thisTerm = allTerms[i]
            if (thisTerm.term.toLowerCase() === this.terms.toLowerCase()) {
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
    margin-top:rem(20);
    .result-text {
      padding-top:3px;
      .result-title {
        text-decoration:underline;
      }
    }
    img {
      float:left;
      margin-right:1rem;
    }
  }
</style>
