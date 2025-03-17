import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MessagesPage from '../components/MessagesPage.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/messages', component: MessagesPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
