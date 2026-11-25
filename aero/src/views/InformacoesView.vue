<script setup>
import { checklistEmbarqueData } from '@/data/voosData'
import { useSuporteStore } from '@/stores/useSuporteStore'

const suporteStore = useSuporteStore()
</script>

<template>
  <div id="pagina-informacoes" class="container pagina-interna">
    <h1 class="titulo-secao">Informações — Tudo que você precisa saber</h1>
    <p class="subtitulo-secao">
      Prepare sua viagem com tranquilidade conferindo nossas regras de embarque, bagagem e tarifas.
    </p>

    <div id="grade-topicos-info" class="grid-info">
      <div id="info-bagagem" class="card-branco bloco-info">
        <h3>Bagagem de Mão e Despachada</h3>
        <p>
          Todos os passageiros têm direito gratuito a 1 artigo pessoal (bolsa ou mochila) e 1 bagagem de mão de até 10 kg na cabine.
        </p>
      </div>

      <div id="info-documentos" class="card-branco bloco-info">
        <h3>Documentos para Viajar</h3>
        <p>
          Para voos nacionais, apresente RG original, CNH ou carteira profissional. Para voos internacionais, passaporte válido é obrigatório.
        </p>
      </div>

      <div id="info-remarcacao" class="card-branco bloco-info">
        <h3>Remarcação e Cancelamento</h3>
        <p>
          Altere a data ou o horário do seu voo diretamente em Minhas Viagens com até 1 hora de antecedência ao embarque.
        </p>
      </div>

      <div id="info-tarifas" class="card-branco bloco-info">
        <h3>Nossas Tarifas (Promo, Light, Plus e Max)</h3>
        <p>
          Escolha entre tarifas econômicas apenas com bagagem de mão ou pacotes completos com despacho de mala e assento Conforto.
        </p>
      </div>
    </div>

    <div id="secao-checklist" class="card-branco caixa-checklist">
      <h2>Checklist do Passageiro (Salvo no navegador)</h2>
      <p class="subtitulo-secao">Marque os itens que você já separou para o dia do voo:</p>

      <div id="lista-itens-check" class="coluna-check">
        <label
          v-for="item in checklistEmbarqueData"
          :key="item"
          class="linha-check"
          :class="{ marcado: suporteStore.dados.documentosConferidos.includes(item) }"
        >
          <input
            type="checkbox"
            :checked="suporteStore.dados.documentosConferidos.includes(item)"
            @change="suporteStore.alternarDocumento(item)"
          />
          <span>{{ item }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 36px;
}

.bloco-info {
  padding: 24px;
  border-top: 4px solid var(--laranja);
}

.bloco-info h3 {
  margin-bottom: 10px;
  font-size: 1.08rem;
}

.bloco-info p {
  font-size: 0.9rem;
  color: var(--cinza-texto);
}

.caixa-checklist {
  padding: 28px;
}

.caixa-checklist h2 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.coluna-check {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.linha-check {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--fundo-site);
  padding: 14px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.linha-check input {
  width: 18px;
  height: 18px;
  accent-color: var(--laranja);
}

.linha-check.marcado span {
  text-decoration: line-through;
  color: var(--verde);
}
</style>