<script setup>
defineProps({
  voo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['reservar'])
</script>

<template>
  <div :id="'card-cidade-' + voo.id" class="card-branco card-destino">
    <div class="imagem-wrapper">
      <img :src="voo.foto" :alt="voo.cidade" class="foto-destino" />
      <span class="etiqueta-estado">{{ voo.estado }} ({{ voo.uf }})</span>
    </div>

    <div class="conteudo-card">
      <div class="texto-origem">Saindo de {{ voo.origem }}</div>
      <h3 class="nome-cidade">{{ voo.cidade }} - {{ voo.uf }}</h3>
      <p class="resumo-api">{{ voo.descricao }}</p>
      <div class="detalhes-horario">{{ voo.horarioSaida }} - {{ voo.horarioChegada }} ({{ voo.duracao }})</div>

      <div class="rodape-preco">
        <div class="box-valor">
          <span class="legenda-tarifa">Ida a partir de</span>
          <strong class="preco-destaque">R$ {{ voo.preco.toFixed(2).replace('.', ',') }}</strong>
        </div>

        <button class="btn-laranja" @click="emit('reservar', voo)">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-destino {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.card-destino:hover {
  transform: translateY(-4px);
}

.imagem-wrapper {
  position: relative;
  height: 195px;
  background-color: #e5e7eb;
}

.foto-destino {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.etiqueta-estado {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--laranja);
  color: var(--branco);
  font-size: 0.76rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.conteudo-card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.texto-origem {
  font-size: 0.8rem;
  color: var(--cinza-texto);
}

.nome-cidade {
  font-size: 1.25rem;
  margin: 4px 0 6px;
  color: var(--grafite);
}

.resumo-api {
  font-size: 0.84rem;
  color: var(--cinza-texto);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.detalhes-horario {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--grafite);
  margin-bottom: 16px;
}

.rodape-preco {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--cinza-borda);
  padding-top: 14px;
}

.legenda-tarifa {
  display: block;
  font-size: 0.75rem;
  color: var(--cinza-texto);
}

.preco-destaque {
  font-size: 1.28rem;
  color: var(--laranja);
}
</style>