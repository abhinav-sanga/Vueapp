import Vue from 'vue'
import Router from 'vue-router'
import blog from '../components/SinglePostComponent'
import posts from '../components/PostComponent'
import found from '../components/FoundPosts'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: posts
    },
    {
    	path:'/:id',
    	name: 'blog',
    	component: blog
    },
    {
      path:'/:word',
      name: 'found',
      component: found
    }
  ]
})