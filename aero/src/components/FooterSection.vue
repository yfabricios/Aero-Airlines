<script setup>
import { ref } from 'vue'
import { useSuporteStore } from '@/stores/useSuporteStore'

const suporteStore = useSuporteStore()
const emailNewsletter = ref('')
const avisoCadastro = ref('')

function enviarNewsletter() {
  if (!emailNewsletter.value.includes('@')) return
  suporteStore.salvarEmailNewsletter(emailNewsletter.value)
  avisoCadastro.value = 'E-mail cadastrado com sucesso para receber promoções!'
  emailNewsletter.value = ''
}
</script>

<template>
  <footer id="rodape-site" class="rodape-geral">
    <div id="faixa-newsletter" class="bloco-newsletter">
      <div class="container flex-newsletter">
        <div class="texto-newsletter">
          <h3>Receba novidades</h3>
          <p>Se inscreva em nossa newsletter e fique por dentro de ofertas e novidades.</p>
        </div>

        <form id="form-newsletter" class="linha-form-news" @submit.prevent="enviarNewsletter">
          <input
            id="input-email-news"
            type="email"
            v-model="emailNewsletter"
            placeholder="Digite seu email"
            required
          />
          <button type="submit" class="btn-laranja">Enviar</button>
        </form>
      </div>
      <div v-if="avisoCadastro" class="container mensagem-verde">{{ avisoCadastro }}</div>
    </div>

    <div id="links-rodape" class="container grid-rodape">
      <div class="coluna-rodape">
        <h4>Sobre a Aero Airlines</h4>
        <p>Voando alto com tarifas acessíveis, conforto e atendimento digital.</p>
      </div>

      <div class="coluna-rodape">
        <h4>Navegação Rápida</h4>
        <div class="lista-links-rodape">
          <router-link to="/">Home</router-link>
          <router-link to="/checkin">Check-in Online</router-link>
          <router-link to="/minhas-viagens">Minhas Viagens</router-link>
        </div>
      </div>

      <div class="coluna-rodape">
        <h4>Suporte ao Passageiro</h4>
        <div class="lista-links-rodape">
          <router-link to="/informacoes">Informações de Bagagem e Documentos</router-link>
          <router-link to="/atendimento">Central de Atendimento</router-link>
        </div>
      </div>
    </div>

    <div id="direitos-autorais" class="faixa-legal">
      Aero Airlines Linhas Aéreas S.A. — Projeto Vue 3 + Vite + Pinia + API IBGE & Wikipédia.
    </div>
  </footer>
</template>

<style scoped>
.rodape-geral {
  background-color: var(--branco);
  border-top: 1px solid var(--cinza-borda);
  margin-top: 60px;
}

.bloco-newsletter {
  background-color: var(--grafite);
  color: var(--branco);
  padding: 28px 0;
}

.flex-newsletter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.linha-form-news {
  display: flex;
  gap: 10px;
}

.linha-form-news input {
  height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  min-width: 240px;
}

.mensagem-verde {
  color: #4ade80;
  font-size: 0.85rem;
  margin-top: 8px;
}

.grid-rodape {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  padding: 36px 20px;
}

.coluna-rodape h4 {
  color: var(--laranja);
  margin-bottom: 12px;
}

.lista-links-rodape {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--cinza-texto);
  font-size: 0.92rem;
}

.lista-links-rodape a:hover {
  color: var(--laranja);
}

.faixa-legal {
  background-color: var(--fundo-site);
  text-align: center;
  padding: 16px;
  font-size: 0.82rem;
  color: var(--cinza-texto);
}
</style>