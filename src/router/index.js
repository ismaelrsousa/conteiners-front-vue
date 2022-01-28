import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movimentacao from '../views/Movimentacao.vue'
import Relatorio from '../views/Relatorio.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movimentacao',
    name: 'Movimentacao',
    component: Movimentacao
  },
  {
    path: '/relatorio',
    name: 'Relatorio',
    component: Relatorio
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
