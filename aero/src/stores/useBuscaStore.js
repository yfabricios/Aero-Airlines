import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useBuscaStore = defineStore('busca', () => {
  const STORAGE_KEY = 'aero_busca_filtros'

  const carregarBusca = () => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        return JSON.parse(salvo)
      } catch (e) {
        console.error('Erro ao ler busca salva', e)
      }
    }
    return {
      tipoViagem: 'ida-volta',
      origem: 'Natal (NAT)',
      cidadeBusca: '',
      dataIda: '2026-12-15',
      dataVolta: '2026-12-22',
      passageiros: 1
    }
  }

  const filtros = ref(carregarBusca())

  watch(
    () => filtros.value,
    (novosFiltros) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosFiltros))
    },
    { deep: true }
  )

  function limparBusca() {
    filtros.value.cidadeBusca = ''
  }

  return { filtros, limparBusca }
})