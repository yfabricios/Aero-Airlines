import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSuporteStore = defineStore('suporte', () => {
  const STORAGE_KEY = 'aero_suporte_dados'

  const carregarDados = () => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        return JSON.parse(salvo)
      } catch (e) {
        console.error('Erro ao ler dados de suporte', e)
      }
    }
    return {
      protocolos: [],
      documentosConferidos: [],
      emailsNewsletter: []
    }
  }

  const dados = ref(carregarDados())

  watch(
    () => dados.value,
    (novosDados) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosDados))
    },
    { deep: true }
  )

  function abrirProtocolo(nome, email, assunto, mensagem) {
    const numeroProtocolo = 'PROT-' + Math.floor(10000 + Math.random() * 89999)
    dados.value.protocolos.unshift({
      numeroProtocolo,
      nome,
      email,
      assunto,
      mensagem,
      status: 'Em análise',
      data: new Date().toLocaleDateString('pt-BR')
    })
    return numeroProtocolo
  }

  function alternarDocumento(itemNome) {
    const idx = dados.value.documentosConferidos.indexOf(itemNome)
    if (idx === -1) {
      dados.value.documentosConferidos.push(itemNome)
    } else {
      dados.value.documentosConferidos.splice(idx, 1)
    }
  }

  function salvarEmailNewsletter(email) {
    if (email && !dados.value.emailsNewsletter.includes(email)) {
      dados.value.emailsNewsletter.push(email)
    }
  }

  return { dados, abrirProtocolo, alternarDocumento, salvarEmailNewsletter }
})