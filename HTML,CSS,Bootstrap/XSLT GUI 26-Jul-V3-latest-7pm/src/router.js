import { createRouter, createWebHistory } from 'vue-router'; // Import necessary functions from vue-router


// import Converter from './views/ConverterView.vue';

import ConverterView from './views/ConverterView.vue';
import FileDifference from './views/FileDIfference.vue';

import TransfomerView from './views/TransformerView.vue'
import TrashView from './views/TrashView.vue';
import LoginView from './views/LoginView.vue';

import { getCookie } from '../src/cookie';

const routes = [
  { path: '/login', name: 'LoginView', component: LoginView, meta: { hideProfileIcon: true } },

  { path: '/', name: 'ConverterView', component: ConverterView, meta: { requiresAuth: true } },
  

  {
    path: '/compare',
    name: 'FileDifferenceNew',
    component: FileDifference,
    props: true, 
    meta: { requiresAuth: true }

  },
  

  { path: '/xml-transformer', name: 'XmlTransformView', component: TransfomerView, meta: { requiresAuth: true } },

  { path: '/trash-view', name: 'TrashView', component: TrashView, meta: { requiresAuth: true } },


];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authToken = getCookie('userId');
    if (authToken) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
export default router;
