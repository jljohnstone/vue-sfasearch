import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueResource)

/* eslint-disable no-new */

Vue.filter('toDate', function (value) {
  var year = value.substring(0, 4)
  var month = value.substring(4, 6)
  var day = value.substring(6, 8)
  var formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US')
  return formattedDate
})

Vue.filter('fixEventLink', function (value) {
  return value.replace('&ID=', '#event')
})

new Vue({
  el: 'body',
  components: { App }
})
