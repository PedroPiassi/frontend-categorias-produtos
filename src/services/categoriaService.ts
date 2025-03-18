import type { TCategoria } from '@/types/categoria'
import { useApi } from './api'

const useCategoriaService = () => {
  const { api } = useApi()

  const getAll = async () => {
    return await api.get(`/categorias`)
  }

  const store = async (data: TCategoria) => {
    return await api.post(`/categoria`, data)
  }

  const update = async (id: number, data: TCategoria) => {
    return await api.put(`/categoria/${id}`, data)
  }

  const deleteCategoria = async (id: number) => {
    return await api.delete(`/categoria/${id}`)
  }

  return { getAll, store, update, deleteCategoria }
}

export default useCategoriaService
