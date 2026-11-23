<script setup>
import { useReservasStore } from '@/stores/useReservasStore'

const reservasStore = useReservasStore()
</script>

<template>
  <div id="pagina-minhas-viagens" class="container pagina-interna">
    <h1 class="titulo-secao">Minhas Viagens</h1>
    <p class="subtitulo-secao">
      Gerencie suas reservas ativas, confira seu assento e acompanhe o status do check-in.
    </p>

    <div v-if="reservasStore.reservas.length" id="lista-bilhetes" class="coluna-bilhetes">
      <div
        v-for="bilhete in reservasStore.reservas"
        :key="bilhete.codigo"
        :id="'bilhete-' + bilhete.codigo"
        class="card-branco card-bilhete"
      >
        <div class="topo-bilhete">
          <div class="codigo-box">
            Localizador: <strong>{{ bilhete.codigo }}</strong>
          </div>
          <div class="status-box" :class="{ concluido: bilhete.checkinRealizado }">
            {{ bilhete.checkinRealizado ? ' Check-in Realizado' : ' Aguardando Check-in' }}
          </div>
        </div>

        <div class="corpo-bilhete">
          <div class="trajeto-com-foto">
            <img :src="bilhete.foto" :alt="bilhete.cidade" class="miniatura-cidade" />
            <div class="info-trajeto">
              <h3>{{ bilhete.origem }} → {{ bilhete.cidade }} ({{ bilhete.estado }})</h3>
              <p>Horário: {{ bilhete.horarioSaida }} às {{ bilhete.horarioChegada }}</p>
              <p>Passageiros: {{ bilhete.passageiros }} | Assento reservado: <strong>{{ bilhete.assento }}</strong></p>
            </div>
          </div>

          <div class="acoes-bilhete">
            <div class="valor-total">R$ {{ bilhete.valorTotal.toFixed(2).replace('.', ',') }}</div>
            <div class="grupo-botoes">
              <router-link v-if="!bilhete.checkinRealizado" to="/checkin" class="btn-laranja">
                Fazer Check-in
              </router-link>
              <button class="btn-contorno" @click="reservasStore.cancelarPassagem(bilhete.codigo)">
                Cancelar Voo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else id="sem-viagens" class="card-branco caixa-vazia">
      <h3>Você ainda não possui viagens reservadas.</h3>
      <p>Volte para a Home e escolha um dos nossos destinos!</p>
      <router-link to="/" class="btn-laranja botao-voltar">Ver Passagens na Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.coluna-bilhetes {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card-bilhete {
  overflow: hidden;
}

.topo-bilhete {
  background-color: var(--laranja-claro);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.92rem;
}

.status-box {
  font-weight: 700;
  color: var(--laranja);
}

.status-box.concluido {
  color: var(--verde);
}

.corpo-bilhete {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.trajeto-com-foto {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.miniatura-cidade {
  width: 96px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
}

.info-trajeto h3 {
  margin-bottom: 4px;
  font-size: 1.15rem;
}

.info-trajeto p {
  font-size: 0.9rem;
  color: var(--cinza-texto);
}

.acoes-bilhete {
  text-align: right;
}

.valor-total {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.grupo-botoes {
  display: flex;
  gap: 10px;
}

.caixa-vazia {
  padding: 48px 24px;
  text-align: center;
}

.botao-voltar {
  margin-top: 16px;
}
</style>