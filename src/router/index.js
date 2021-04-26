import Vue from 'vue'
import Router from 'vue-router'
import HeaderContent from '@/components/layout/HeaderContentLayout'
import HeaderMenuContent from '@/components/layout/HeaderMenuContentLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: HeaderContent,
      props: {currentComponent: 'Login'}
    },
    {
      path: '/register',
      name: 'Register',
      component: HeaderContent,
      props: {currentComponent: 'Register'}
      
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: HeaderMenuContent,
      props: {currentComponentProp: 'Attendance'}
    },
    {
      path: '/request',
      name: 'Reequest',
      component: HeaderContent,
      props: {currentComponent: 'Request'}
      
    },
    {
      path: '/setting',
      name: 'Setting',
      component: HeaderMenuContent,
      props: {currentComponentProp: 'Setting'}
    },
  ]
})
