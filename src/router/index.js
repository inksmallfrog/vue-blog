import Vue from 'vue'
import Router from 'vue-router'
import PassageList from '@/components/PassageList'
import Passage from '@/components/Passage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PassageList',
      component: PassageList
    },
    {
      path: '/passages/:id',
      name: 'Passage',
      component: Passage
    }
  ],
  scrollBehavior(){
    return {
      x: 0,
      y: 0
    }
  }
})
