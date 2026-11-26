<script setup>
import { ref } from 'vue'
import { useReservasStore } from '@/stores/useReservasStore'

const reservasStore = useReservasStore()
const codigoInput = ref('')
const mensagemStatus = ref('')

function confirmarEmbarque() {
  const sucesso = reservasStore.realizarCheckin(codigoInput.value)
  if (sucesso) {
    mensagemStatus.value = `Check-in realizado com sucesso para a reserva ${codigoInput.value.toUpperCase()}!`
    codigoInput.value = ''
  } else {
    mensagemStatus.value = 'Localizador não encontrado. Compre uma passagem na Home ou confira em Minhas Viagens.'
  }
}
</script>

<template>
  <div id="pagina-checkin" class="container pagina-interna">
    <div id="painel-checkin" class="card-branco caixa-central">
      <h1 class="titulo-secao">Check-in Online</h1>
      <p class="subtitulo-secao">
        Informe o código localizador da sua reserva (ex: AERO1234) para confirmar sua presença no voo.
      </p>

      <form id="form-checkin" class="linha-checkin" @submit.prevent="confirmarEmbarque">
        <div class="campo-grupo campo-expandido">
          <label for="codigo-localizador">Código Localizador</label>
          <input
            id="codigo-localizador"
            type="text"
            v-model="codigoInput"
            placeholder="Ex: AERO4821"
            required
          />
        </div>

        <button id="btn-confirmar-checkin" type="submit" class="btn-laranja botao-alinha">
          Fazer Check-in
        </button>
      </form>

      <div v-if="mensagemStatus" id="feedback-checkin" class="alerta-checkin">
        {{ mensagemStatus }}
      </div>

      <div v-if="reservasStore.reservas.length" id="lista-atalho-checkin" class="bloco-atalhos">
        <h3>Suas reservas disponíveis para Check-in:</h3>

        <div
          v-for="item in reservasStore.reservas"
          :key="item.codigo"
          :id="'reserva-checkin-' + item.codigo"
          class="linha-reserva"
        >
          <div class="dados-voo">
            <strong>{{ item.codigo }}</strong> — {{ item.origem }} → {{ item.cidade }}/{{ item.uf }} (Assento {{ item.assento }})
          </div>

          <button
            v-if="!item.checkinRealizado"
            class="btn-contorno"
            @click="reservasStore.realizarCheckin(item.codigo)">
            Confirmar agora
          </button>

          <span v-else class="selo-embarque-ok">✔ Embarque Liberado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.caixa-central {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px;
}

.linha-checkin {
  display: flex;
  gap: 12px;
  align-items: end;
  flex-wrap: wrap;
}

.campo-expandido {
  flex: 1;
  min-width: 220px;
}

.campo-expandido input {
  text-transform: uppercase;
}

.botao-alinha {
  height: 44px;
}

.alerta-checkin {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--laranja-claro);
  color: var(--laranja-escuro);
  font-weight: 700;
  border-radius: 8px;
}

.bloco-atalhos {
  margin-top: 28px;
  border-top: 1px solid var(--cinza-borda);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.linha-reserva {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fundo-site);
  padding: 12px 16px;
  border-radius: 8px;
  gap: 12px;
  flex-wrap: wrap;
}

.selo-embarque-ok {
  color: var(--verde);
  font-weight: 700;
  font-size: 0.9rem;
}
</style>