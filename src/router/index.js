import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index.vue'
import AddSmoothy from '@/components/AddSmoothy.vue';
import EditSmoothy from '@/components/EditSmoothy.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/add-smoothy',
    name: 'AddSmoothy',
    component: AddSmoothy,
  },
  {
    path: '/edit-smoothy/:smoothy_slug',
    name: 'EditSmoothy',
    component: EditSmoothy,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
