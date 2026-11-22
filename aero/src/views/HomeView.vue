<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BuscaVoosForm from '@/components/BuscaVoosForm.vue'
import CardDestino from '@/components/CardDestino.vue'
import { cidadesDestaqueData, horariosVoosData } from '@/data/voosData'
import { useBuscaStore } from '@/stores/useBuscaStore'
import { useReservasStore } from '@/stores/useReservasStore'

const router = useRouter()
const buscaStore = useBuscaStore()
const reservasStore = useReservasStore()

const municipiosIbge = ref([])
const destinosCards = ref([])
const carregando = ref(true)
const erroBusca = ref('')

async function montarDestinoComFoto(nomeCidade, indice = 0) {
  const termoNormalizado = nomeCidade.trim().toLowerCase()

  const achadoIbge =
    municipiosIbge.value.find((m) => m['municipio-nome'].toLowerCase() === termoNormalizado) ||
    municipiosIbge.value.find((m) => m['municipio-nome'].toLowerCase().includes(termoNormalizado))

  const cidadeFinal = achadoIbge ? achadoIbge['municipio-nome'] : nomeCidade.trim()
  const estadoFinal = achadoIbge ? achadoIbge['UF-nome'] : 'Brasil'
  const ufFinal = achadoIbge ? achadoIbge['UF-sigla'] : 'BR'

  const slugWiki = encodeURIComponent(cidadeFinal.replace(/ /g, '_'))
  const respostaFoto = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${slugWiki}`)
  const dadosFoto = await respostaFoto.json()

  const horario = horariosVoosData[indice % horariosVoosData.length]

  return {
    id: achadoIbge ? achadoIbge['municipio-id'] : Date.now() + indice,
    origem: buscaStore.filtros.origem || 'Natal (NAT)',
    cidade: cidadeFinal,
    estado: estadoFinal,
    uf: ufFinal,
    foto:
      dadosFoto.thumbnail?.source ||
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
    descricao:
      dadosFoto.extract ||
      `Voe direto para ${cidadeFinal}, no estado de ${estadoFinal}, com tarifas promocionais Aero Airlines.`,
    horarioSaida: horario.saida,
    horarioChegada: horario.chegada,
    duracao: horario.duracao,
    preco: horario.precoBase
  }
}

async function carregarDadosIniciais() {
  try {
    const respostaIbge = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado'
    )
    municipiosIbge.value = await respostaIbge.json()

    const listaPronta = await Promise.all(
      cidadesDestaqueData.map((cidade, idx) => montarDestinoComFoto(cidade, idx))
    )

    destinosCards.value = listaPronta
  } catch (erro) {
    console.error('Erro ao buscar na API:', erro)
  } finally {
    carregando.value = false
  }
}

onMounted(carregarDadosIniciais)

async function pesquisarNovaCidade() {
  const termo = buscaStore.filtros.cidadeBusca.trim()
  if (!termo) return

  erroBusca.value = ''
  carregando.value = true

  try {
    const novoDestino = await montarDestinoComFoto(termo, 0)

    destinosCards.value = [
      novoDestino,
      ...destinosCards.value.filter(
        (item) => item.cidade.toLowerCase() !== novoDestino.cidade.toLowerCase()
      )
    ]

    const secaoOfertas = document.getElementById('secao-ofertas')
    if (secaoOfertas) secaoOfertas.scrollIntoView({ behavior: 'smooth' })
  } catch (erro) {
    console.error('Erro ao pesquisar cidade:', erro)
    erroBusca.value = 'Não foi possível carregar a foto desta cidade. Tente outra cidade.'
  } finally {
    carregando.value = false
  }
}

function comprarVoo(voo) {
  reservasStore.comprarPassagem(voo, buscaStore.filtros.passageiros)
  router.push('/minhas-viagens')
}
</script>

<template>
  <div id="pagina-home">
    <section id="hero-banner" class="banner-ceu">
      <div class="container conteudo-hero">
        <span class="tag-destaque">PROMOÇÃO VOO PREMIADO • DESTINOS DO BRASIL</span>
        <h1 class="titulo-hero">Antecipamos as ofertas! Passagens a partir de R$ 205,59*</h1>
        <p class="texto-hero">
          Digite qualquer cidade do Brasil abaixo para ver fotos reais, estado e tarifas na hora.
        </p>
      </div>
    </section>

    <div id="wrapper-busca" class="container area-busca-flutuante">
      <BuscaVoosForm
        :sugestoesCidades="municipiosIbge"
        @buscarCidade="pesquisarNovaCidade"
      />
    </div>

    <section id="secao-gerencie-viagem" class="container bloco-secao">
      <h2 class="titulo-secao">Gerencie sua viagem</h2>
      <p class="subtitulo-secao">Acesse rapidamente os serviços para o seu embarque.</p>

      <div id="grid-servicos" class="grade-quatro-colunas">
        <router-link to="/checkin" id="atalho-checkin" class="card-branco item-servico">
          <div class="icone-servico">✔</div>
          <h3>Check-in</h3>
          <p>Faça o check-in e confirme sua presença no voo.</p>
        </router-link>

        <router-link to="/minhas-viagens" id="atalho-viagens" class="card-branco item-servico">
          <div class="icone-servico">🧳</div>
          <h3>Minhas Viagens</h3>
          <p>Consulte suas reservas, localizador e assento.</p>
        </router-link>

        <router-link to="/informacoes" id="atalho-informacoes" class="card-branco item-servico">
          <div class="icone-servico">📋</div>
          <h3>Informações</h3>
          <p>Veja regras de bagagem, tarifas e documentos para viajar.</p>
        </router-link>

        <router-link to="/atendimento" id="atalho-atendimento" class="card-branco item-servico">
          <div class="icone-servico">💬</div>
          <h3>Atendimento</h3>
          <p>Tire dúvidas no FAQ ou abra um protocolo de suporte.</p>
        </router-link>
      </div>
    </section>

    <section id="secao-ofertas" class="container bloco-secao">
      <div class="topo-ofertas">
        <div>
          <h2 class="titulo-secao">Destinos em Destaque</h2>
          <p class="subtitulo-secao">
            Dados geográficos do IBGE combinados com fotos reais da cidade.
          </p>
        </div>

        <button
          v-if="buscaStore.filtros.cidadeBusca"
          class="btn-contorno"
          @click="buscaStore.limparBusca()"
        >
          Limpar campo de busca
        </button>
      </div>

      <div v-if="erroBusca" id="alerta-erro-api" class="card-branco caixa-aviso">
        {{ erroBusca }}
      </div>

      <div v-if="carregando" id="aviso-carregando" class="card-branco caixa-aviso">
        Buscando cidade, estado e imagem na API...
      </div>

      <div v-else id="lista-cards-destinos" class="grade-destinos">
        <CardDestino
          v-for="voo in destinosCards"
          :key="voo.id"
          :voo="voo"
          @reservar="comprarVoo"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.banner-ceu {
  background: linear-gradient(125deg, #0369a1 0%, #0284c7 52%, #38bdf8 100%);
  color: var(--branco);
  padding: 54px 0 94px;
}

.conteudo-hero {
  max-width: 780px;
  text-align: center;
}

.tag-destaque {
  background-color: rgba(255, 255, 255, 0.22);
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.titulo-hero {
  font-size: 2.15rem;
  margin: 14px 0 10px;
  line-height: 1.2;
}

.area-busca-flutuante {
  margin-top: -58px;
}

.bloco-secao {
  margin-top: 48px;
}

.grade-quatro-colunas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 18px;
}

.item-servico {
  padding: 22px;
  border-left: 4px solid var(--azul-principal);
  transition: transform 0.2s;
}

.item-servico:hover {
  transform: translateY(-3px);
}

.icone-servico {
  font-size: 1.45rem;
  margin-bottom: 10px;
}

.item-servico h3 {
  font-size: 1.05rem;
  margin-bottom: 6px;
}

.item-servico p {
  font-size: 0.88rem;
  color: var(--cinza-texto);
}

.topo-ofertas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.grade-destinos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.caixa-aviso {
  padding: 32px;
  text-align: center;
  color: var(--cinza-texto);
  margin-bottom: 20px;
}
</style>