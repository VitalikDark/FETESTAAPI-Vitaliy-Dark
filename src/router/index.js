import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '../views/Films'
import FilmsSessions from '../views/FilmsSessions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'films',
    component: Films
  },
  {
    path: '/sessions',
    name: 'Sessions',
    component: FilmsSessions
  }
]

const router = new VueRouter({
  routes
})

export default router
