import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

Vue.filter('year-month', function (value) {
  return months[parseInt(value.slice(5, 7)) - 1] + ' ' + value.slice(0, 4)
})

Vue.filter('month-date-year', function (value) {
  value = new Date(value)
  return months[value.getMonth()] + ' ' + value.getDate() + ', ' + value.getFullYear()
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
})
