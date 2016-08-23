<template>
  <div class="directory-results" v-show="count">
    <h2>People Results</h2>
    <div class="people">
      <div v-for="person in directory.results" class="person">
        <div class="photo">
          <a href="https://orion.sfasu.edu/directory/details.aspx?id={{ person._source.id }}"><img :src="person._source.image" :alt="person._source.fullname"></a>
        </div>
        <ul class="details">
          <li class="name">
            <a href="https://orion.sfasu.edu/directory/details.aspx?id={{ person._source.id }}">{{ person._source.fullname }}</a>
          </li>
          <li>
            {{ person._source.role }}, {{ person._source.department }}
          </li>
          <li>
            <a href="mailto:{{ person._source.email }}">{{ person._source.email }}</a>
          </li>
          <li>
            {{ person._source.phone }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import slick from 'slick-carousel'

  export default {
    data () {
      return {
        directory: '',
        count: 0
      }
    },
    props: ['terms'],
    events: {
      runSearch (terms) {
        this.count = 0
        this.terms = terms
        this.removeSlick()
        var searchURI = 'http://library.sfasu.edu/api/search/directory/json?q=' + this.terms
        this.$http.jsonp(searchURI).then((response) => {
          this.$set('directory', response.json())
          this.$dispatch('searchComplete', 'directory')
          this.$set('count', this.directory.total)
          // console.log('count: ' + this.count)
          this.initSlick()
        }, (response) => {
          console.error('error fetching directory JSON')
        })
      }
    },
    methods: {
      initSlick () {
        this.$nextTick(function () {
          // console.log('initSlick')
          $('.people').slick({
            slidesToShow: 3,
            slidesToScroll: 1
          })
        })
      },
      removeSlick () {
        try {
          $('.people').slick('unslick') // remove the existing slick instance
        } catch (ex) { // when there is no existing slick instance
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/app";
  .directory-results {
    @include outer-container;
  }
  .people {
    @include row();
    .person {
      padding: rem(10);
      background-color: tint($gray, 20%);
      border-right:rem(10) solid #fff;
      .photo {
        @include span-columns(3 of 12);
        img {
          @include fill-parent();
          border:rem(2) solid #fff;
          height:80px;
          object-fit: cover;
        }
      }
      .details {
        @include span-columns(9 of 12);
        font-size:rem(12);
        .name {
          font-size: rem(18);
        }
      }
    }
  }
</style>
