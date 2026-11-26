<script setup>
import { useRouter } from 'vue-router'
import { useReservasStore } from '@/stores/useReservasStore'

const router = useRouter()
const reservasStore = useReservasStore()

function irParaSecao(idSecao) {
  router.push('/').then(() => {
    setTimeout(() => {
      const elemento = document.getElementById(idSecao)
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  })
}
</script>

<template>
  <header id="cabecalho-principal" class="faixa-externa-header">
    <div id="barra-pilula-header" class="container-pilula">
      <!-- Logo AERO em Azul Céu -->
      <router-link to="/" id="logo-aero" class="logo-marca" title="Ir para Home">
        <span class="texto-azul-escuro">AER</span><span class="texto-azul-claro">O</span>
      </router-link>

      <!-- Menu de navegação -->
      <nav id="menu-navegacao" class="lista-menu">
        <router-link to="/checkin" class="link-menu">Check-in</router-link>

        <router-link to="/minhas-viagens" class="link-menu link-com-badge">
          Minhas Viagens
          <span v-if="reservasStore.reservas.length" class="contador-viagens">
            {{ reservasStore.reservas.length }}
          </span>
        </router-link>

        
        <router-link to="/informacoes" class="link-menu">Informações</router-link>
        
        <router-link to="/atendimento" class="link-menu">Atendimento</router-link>
        
        <a href="#secao-ofertas" class="link-menu" @click.prevent="irParaSecao('secao-ofertas')">
          Ofertas
        </a>
        
        <a href="#secao-gerencie-viagem" class="link-menu" @click.prevent="irParaSecao('secao-gerencie-viagem')">
          Serviços
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.faixa-externa-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e2eef8;
  padding: 14px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container-pilula {
  width: fit-content;
  max-width: 1240px;
  margin: 0 auto;
  background-color: #eef6fc;
  border-radius: 999px;
  padding: 16px 36px;
  display: flex;
  align-items: center;
  gap: 34px;
  flex-wrap: wrap;
}

.logo-marca {
  display: inline-flex;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1;
}

.texto-azul-escuro {
  color: #0284c7;
}

.texto-azul-claro {
  color: #7dd3fc;
}

.lista-menu {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
}

.link-menu {
  color: #0f2942;
  font-size: 0.95rem;
  font-weight: 700;
  transition: color 0.2s;
  cursor: pointer;
}

.link-menu:hover, .link-menu.router-link-active {
  color: #0284c7;
}

.link-com-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.contador-viagens {
  background-color: #0284c7;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
}
</style>