<template>
  <div class="website-results">
    <h2>Website Results</h2>
    <div v-if="count">
    <label><input type="checkbox" v-model="include_docs" v-on:click="toggleDocs"> Include documents</label>
      <ol class="website-results-list">
        <li v-for="entry in website.result" class="website-result">
          <div class="result-title">
            <i class="fa fa-file-pdf-o" aria-hidden="true" title="PDF file" v-if="entry.filetype === 'pdf'">&nbsp;</i>
            <a href="{{ entry.url_link }}">
              {{ entry.content_title || "untitled document"}}
            </a>
            <sup class="filetype" v-if="entry.filetype === 'pdf'">[PDF]</sup>
          </div>
          <div class="result-body">
            {{{ entry.content_description }}}
          </div>
          <div class="result-url">
            {{ entry.url_link }}
          </div>
        </li>
      </ol>
    </div>
    <p v-else>
      <strong>There were no relevant webpages found.</strong>
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        website: '',
        count: 0,
        include_docs: false
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
        var searchURI = 'https://search.sfasu.edu/json?num=100&q=' + this.terms
        if (!this.include_docs) {
          searchURI += '&ex_q=filetype%3Ahtml'
        }
        this.$http.get(searchURI).then((response) => {
          this.$set('website', response.json().response)
          this.$dispatch('searchComplete', 'website')
          this.$set('count', this.website.record_count)
        }, (response) => {
          console.error('error fetching website results JSON')
        })
      },
      toggleDocs () {
        this.$set('include_docs', !this.include_docs)
        this.fetchSearchResults()
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/app";
  .website-results {
    @include outer-container;
    @extend .outer-container-padding;
  }
  .website-results-list {
    @include row();
  }
  .website-result {
    @include span-columns(12);
    @include media($medium-up) {
      @include span-columns(8 of 12)
    }
    .result-title {
      font-size:1.2rem;
      a:hover {
        text-decoration: underline;
      }
    }
    .result-body {
      color:#333;
      margin-top: 0.5rem;
    }
    .result-url {
      color: green;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .filetype {
      color: #777;
      font-size:0.7rem;
    }
    .fa-file-pdf-o {
      color: #bb0706;
    }
  }
</style>
