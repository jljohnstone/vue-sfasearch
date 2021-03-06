<template>
  <div class="website-results">
    <h2>Website Results</h2>
    <div class="website-results-wrapper" v-if="count">
      <!-- <div class="website-results-notice">
        <p>The SFA search engine is currently undergoing maintenance. Search results may be incomplete.</p>
      </div> -->
      <label class="include-documents"><input type="checkbox" v-model="include_docs" v-on:click="toggleDocs"> Include documents <span>(check to include PDFs, Word documents and Excel files in results)</span></label>
      <ol class="website-results-list">
        <li v-for="entry in website.result" class="website-result">
          <div class="result-title">
            <i class="fa fa-file-pdf-o" aria-hidden="true" title="PDF file" v-if="entry.filetype === 'pdf'">&nbsp;</i>
            <a href="{{ entry.url_link }}" onclick="_gaq.push(['_trackEvent', 'sfa-search', 'website-click', '{{ terms }} - {{ entry.url_link }} - {{ $index+1 }}']);">
              {{{ entry.content_title || "untitled document" }}}
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
      <strong v-if="status === 'fail'">Website search is currently offline while a system upgrade is being performed.</strong>
      <strong v-else>There were no relevant webpages found.</strong>
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        website: '',
        count: 0,
        include_docs: false,
        site_search: '',
        status: ''
      }
    },
    props: ['terms', 'site'],
    events: {
      runSearch (terms, site) {
        this.terms = terms
        this.site_search = site
        this.fetchSearchResults()
      }
    },
    methods: {
      fetchSearchResults () {
        var searchURI = 'https://search.sfasu.edu/json?num=100&q=' + this.terms
        if (this.site_search) {
          searchURI += '&ex_q=url%3A*www.sfasu.edu%5C%2F' + this.site_search + '%5C%2F*'
          if (this.site_search === 'policies') {
            this.$set('include_docs', true)
          }
        }
        if (!this.include_docs) {
          searchURI += '&ex_q=filetype%3Ahtml'
        }
        this.$http.get(searchURI).then((response) => {
          this.$set('website', response.body.response)
          this.$dispatch('searchComplete', 'website')
          this.$set('count', this.website.record_count)
          this.$set('status', 'success')
        }, (response) => {
          console.error('error fetching website results JSON')
          this.$set('status', 'fail')
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
  .include-documents {
    @include span-columns(12);
    @include media($medium-up) {
      @include span-columns(8 of 12);
    }
    background-color: #f5f5f5;
    padding:0.5rem;
    margin-bottom:1rem;
    font-weight:bold;
    border-radius: 5px;
    span {
      color:#777;
      font-weight:normal;
    }
  }
  .note {
    @include span-columns(12);
    @include media($medium-up) {
      @include span-columns(4 of 12)
    }
    background:#f5f5f5;
    padding:0.5rem;
  }
  .website-results-wrapper {
    @include span-columns(12);
    .website-results-list {
      @include media($medium-up) {
        @include span-columns(8 of 12)
      }
    }
    .website-results-notice {
      background:#5f259f;
      padding:1em;
      font-weight: bold;
      color:#fff;
      margin-bottom:1em;
      @include media($medium-up) {
        @include span-columns(8 of 12)
      }
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
