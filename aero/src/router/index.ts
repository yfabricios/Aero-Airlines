import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CheckinView from '@/views/CheckinView.vue'
import MinhasViagensView from '@/views/MinhasViagensView.vue'
import InformacoesView from '@/views/InformacoesView.vue'
import AtendimentoView from '@/views/AtendimentoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/checkin', name: 'Checkin', component: CheckinView },
    { path: '/minhas-viagens', name: 'MinhasViagens', component: MinhasViagensView },
    { path: '/informacoes', name: 'Informacoes', component: InformacoesView },
    { path: '/atendimento', name: 'Atendimento', component: AtendimentoView }
  ]
})

export default router