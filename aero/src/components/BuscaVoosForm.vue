<script setup>
import { useBuscaStore } from '@/stores/useBuscaStore'

defineProps({
  sugestoesCidades: {
    type: Array,
    default: () => []
  }
})

const buscaStore = useBuscaStore()
const emit = defineEmits(['buscarCidade'])
</script>

<template>
  <div id="caixa-busca-voos" class="card-branco painel-busca">
    <div id="opcoes-trecho" class="linha-radios">
      <label class="label-radio">
        <input type="radio" value="ida-volta" v-model="buscaStore.filtros.tipoViagem" />
        Ida e volta
      </label>
      <label class="label-radio">
        <input type="radio" value="so-ida" v-model="buscaStore.filtros.tipoViagem" />
        Somente ida
      </label>
    </div>

    <form id="formulario-pesquisa-voo" class="grid-inputs" @submit.prevent="emit('buscarCidade')">
      <div class="campo-grupo">
        <label for="input-origem">Origem</label>
        <input
          id="input-origem"
          type="text"
          v-model="buscaStore.filtros.origem"
          placeholder="Ex: Natal (NAT)"
        />
      </div>

      <div class="campo-grupo">
        <label for="input-cidade-destino">Cidade de Destino (API)</label>
        <input
          id="input-cidade-destino"
          type="text"
          list="lista-municipios-ibge"
          v-model="buscaStore.filtros.cidadeBusca"
          placeholder="Ex: Gramado, Recife, Manaus..."
          required
        />
        <datalist id="lista-municipios-ibge">
          <option
            v-for="mun in sugestoesCidades"
            :key="mun['municipio-id']"
            :value="mun['municipio-nome']"
          />
        </datalist>
      </div>

      <div class="campo-grupo">
        <label for="input-ida">Data de Ida</label>
        <input id="input-ida" type="date" v-model="buscaStore.filtros.dataIda" />
      </div>

      <div v-if="buscaStore.filtros.tipoViagem === 'ida-volta'" class="campo-grupo">
        <label for="input-volta">Data de Volta</label>
        <input id="input-volta" type="date" v-model="buscaStore.filtros.dataVolta" />
      </div>

      <div class="campo-grupo">
        <label for="select-viajantes">Viajantes</label>
        <select id="select-viajantes" v-model.number="buscaStore.filtros.passageiros">
          <option :value="1">1 Adulto</option>
          <option :value="2">2 Adultos</option>
          <option :value="3">3 Adultos</option>
          <option :value="4">4 Adultos</option>
        </select>
      </div>

      <div class="campo-grupo">
        <button id="btn-buscar-voos" type="submit" class="btn-laranja botao-altura">
          Buscar Cidade
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.painel-busca {
  padding: 24px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14);
}

.linha-radios {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.label-radio {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.label-radio input {
  accent-color: var(--laranja);
}

.grid-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  align-items: end;
}

.botao-altura {
  height: 44px;
  width: 100%;
}
</style>