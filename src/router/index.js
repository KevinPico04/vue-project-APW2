import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import LoginView from '../views/LoginView.vue';
import LoginesView from '../views/LoginesView.vue';
import RegisterView from '../views/RegisterView.vue';
import RegisteresView from '../views/RegisteresView.vue';
import HomeView from '../views/HomeView.vue';
import EstudianteView from '../views/EstudianteView.vue';
import PerfilView from '../views/PerfilView.vue'; 
import VerView from '../views/VerViews.vue'; 

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logines',
    name: 'logines',
    component: LoginesView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/registeres',
    name: 'registeres',
    component: RegisteresView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/agregar-tutoria',
    name: 'AgregarTutoria',
    component: () => import('@/views/TutoriasView.vue'),
  },
  {
    path: '/verview',
    name: 'VerView',
    component: VerView,
  },
  {
    path: '/perfil', 
    name: 'PerfilView',
    component: PerfilView,
  },
];

const router = new VueRouter({
  routes,
});


export default router;
