<script setup>
import { ref } from 'vue'
import { faqAtendimentoData } from '@/data/voosData'
import { useSuporteStore } from '@/stores/useSuporteStore'

const suporteStore = useSuporteStore()

const nome = ref('')
const email = ref('')
const assunto = ref('Remarcação de Voo')
const mensagem = ref('')
const protocoloGerado = ref('')

function enviarSolicitacao() {
  protocoloGerado.value = suporteStore.abrirProtocolo(
    nome.value,
    email.value,
    assunto.value,
    mensagem.value
  )
  nome.value = ''
  email.value = ''
  mensagem.value = ''
}
</script>

<template>
  <div id="pagina-atendimento" class="container pagina-interna">
    <h1 class="titulo-secao">Atendimento — Como podemos ajudar?</h1>
    <p class="subtitulo-secao">
      Confira nossas perguntas frequentes ou registre uma solicitação com número de protocolo.
    </p>

    <div id="layout-atendimento" class="grid-duas-colunas">
      <div id="coluna-faq" class="coluna-esquerda">
        <div class="card-branco bloco-faq">
          <h3>Perguntas Frequentes</h3>

          <div v-for="faq in faqAtendimentoData" :key="faq.pergunta" class="item-faq">
            <strong>{{ faq.pergunta }}</strong>
            <p>{{ faq.resposta }}</p>
          </div>
        </div>

        <div v-if="suporteStore.dados.protocolos.length" id="historico-protocolos" class="card-branco bloco-faq">
          <h3>Seus Protocolos Registrados</h3>

          <div
            v-for="prot in suporteStore.dados.protocolos"
            :key="prot.numeroProtocolo"
            class="card-protocolo"
          >
            <div class="topo-prot">
              <strong>{{ prot.numeroProtocolo }}</strong>
              <span class="tag-status">{{ prot.status }}</span>
            </div>
            <div>Assunto: {{ prot.assunto }} ({{ prot.data }})</div>
            <p>{{ prot.mensagem }}</p>
          </div>
        </div>
      </div>

      <div id="coluna-formulario" class="card-branco bloco-form">
        <h3>Abrir Solicitação de Atendimento</h3>

        <form id="form-suporte" class="lista-campos" @submit.prevent="enviarSolicitacao">
          <div class="campo-grupo">
            <label for="nome-cliente">Nome Completo</label>
            <input id="nome-cliente" type="text" v-model="nome" placeholder="Seu nome" required />
          </div>

          <div class="campo-grupo">
            <label for="email-cliente">E-mail para contato</label>
            <input id="email-cliente" type="email" v-model="email" placeholder="seuemail@exemplo.com" required />
          </div>

          <div class="campo-grupo">
            <label for="assunto-cliente">Assunto</label>
            <select id="assunto-cliente" v-model="assunto">
              <option>Remarcação de Voo</option>
              <option>Bagagem Extraviada ou Danificada</option>
              <option>Reembolso de Passagem</option>
              <option>Dúvidas sobre Check-in</option>
            </select>
          </div>

          <div class="campo-grupo">
            <label for="mensagem-cliente">Mensagem</label>
            <textarea
              id="mensagem-cliente"
              rows="4"
              v-model="mensagem"
              placeholder="Descreva como podemos te ajudar..."
              required
            ></textarea>
          </div>

          <button id="btn-enviar-protocolo" type="submit" class="btn-laranja">
            Gerar Protocolo de Atendimento
          </button>
        </form>

        <div v-if="protocoloGerado" id="aviso-protocolo" class="sucesso-prot">
          Solicitação registrada! Seu protocolo é: <strong>{{ protocoloGerado }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-duas-colunas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  align-items: start;
}

.coluna-esquerda {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bloco-faq,
.bloco-form {
  padding: 26px;
}

.bloco-faq h3,
.bloco-form h3 {
  margin-bottom: 16px;
  color: var(--laranja);
}

.item-faq {
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--cinza-borda);
}

.item-faq:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.item-faq p {
  font-size: 0.9rem;
  color: var(--cinza-texto);
  margin-top: 4px;
}

.lista-campos {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sucesso-prot {
  margin-top: 16px;
  padding: 12px;
  background-color: var(--laranja-claro);
  color: var(--laranja-escuro);
  border-radius: 8px;
}

.card-protocolo {
  background-color: var(--fundo-site);
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 0.88rem;
}

.topo-prot {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.tag-status {
  color: var(--laranja);
  font-weight: 700;
}
</style>