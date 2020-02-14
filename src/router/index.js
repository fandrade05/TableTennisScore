import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
//import Login from '@/components/Login'
import SetBox from '@/components/SetBox'
import ControlPanel from '@/components/ControlPanel'
import ScoreBoard from '@/components/ScoreBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    /*{
    	path: '/login',
    	name: 'Login',
    	component: Login
    },*/
    {
      path: '/setbox',
      name: 'SetBox',
      component: SetBox
    },
    {
      path: '/scoreboard',
      name: 'ScoreBoard',
      component: ScoreBoard
    },
    {
      path: '/controlpanel',
      name: 'ControlPanel',
      component: ControlPanel
    }
  ]
})
