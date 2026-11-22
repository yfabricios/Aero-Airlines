import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useReservasStore = defineStore('reservas', () => {
  const STORAGE_KEY = 'aero_minhas_viagens'

  const carregarReservas = () => {
    const salvas = localStorage.getItem(STORAGE_KEY)
    if (salvas) {
      try {
        return JSON.parse(salvas)
      } catch (e) {
        console.error('Erro ao ler reservas', e)
      }
    }
    return []
  }

  const reservas = ref(carregarReservas())

  watch(
    () => reservas.value,
    (novasReservas) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasReservas))
    },
    { deep: true }
  )

  function comprarPassagem(voo, passageiros = 1) {
    const codigo = 'AERO' + Math.floor(1000 + Math.random() * 9000)

    reservas.value.unshift({
      codigo,
      origem: voo.origem,
      cidade: voo.cidade,
      estado: voo.estado,
      uf: voo.uf,
      foto: voo.foto,
      horarioSaida: voo.horarioSaida,
      horarioChegada: voo.horarioChegada,
      passageiros,
      valorTotal: Number((voo.preco * passageiros).toFixed(2)),
      checkinRealizado: false,
      assento: `${Math.floor(1 + Math.random() * 28)}A`
    })

    return codigo
  }

  function realizarCheckin(codigoDigitado) {
    const reserva = reservas.value.find(
      (item) => item.codigo.toUpperCase() === codigoDigitado.trim().toUpperCase()
    )
    if (reserva) {
      reserva.checkinRealizado = true
      return true
    }
    return false
  }

  function cancelarPassagem(codigo) {
    reservas.value = reservas.value.filter((item) => item.codigo !== codigo)
  }

  return { reservas, comprarPassagem, realizarCheckin, cancelarPassagem }
})