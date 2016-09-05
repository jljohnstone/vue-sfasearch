<template>
  <div class="calendar-results" v-show="count">
    <h2>Event Results</h2>
    <div class="events">
      <div v-for="event in calendar.hits.hits" class="sfa-event">
        <ul>
          <li class="name">
            <a href="{{ event._source.link }}">{{{ event.highlight.title }}}</a>
          </li>
          <li class="date">
            {{ event._source.date | toDate }}
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
        calendar: '',
        count: 0
      }
    },
    props: ['terms'],
    events: {
      runSearch (terms) {
        this.count = 0
        this.terms = terms
        this.removeSlick()
        var searchURI = 'http://library.sfasu.edu/api/sfa/events?cache=true&size=100&q=' + this.terms
        this.$http.get(searchURI).then((response) => {
          this.$set('calendar', response.json())
          this.$dispatch('searchComplete', 'calendar')
          this.$set('count', this.calendar.hits.total)
          this.initSlick()
        }, (response) => {
          console.error('error fetching calendar results JSON')
        })
      }
    },
    methods: {
      initSlick () {
        this.$nextTick(function () {
          $('.events').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          })
        })
      },
      removeSlick () {
        try {
          $('.events').slick('unslick') // remove the existing slick instance
        } catch (ex) { // when there is no existing slick instance
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "../assets/scss/app";
  .calendar-results {
    @include outer-container;
    @extend .outer-container-padding;
  }
  .events {
    @include row();
    padding-left:rem(20);
    padding-right:rem(20);
    .sfa-event {
      background:tint($gray, 20%) url('../assets/calendar.png') no-repeat rem(10) rem(10);
      background-size:rem(33);
      border-right:rem(5) solid #fff;
      border-left:rem(5) solid #fff;
      padding: rem(10);
      padding-left:rem(30);
      ul {
        margin-left:rem(30);
      }
      .name {
        font-size: rem(14);
      }
      .date {
        font-size: rem(14);
      }
    }
  }
</style>
