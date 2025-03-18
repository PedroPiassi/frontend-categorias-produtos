import type { TProduto } from '@/types/produto'
import { useApi } from './api'

const useProdutoService = () => {
  const { api } = useApi()

  const getAll = async () => {
    return await api.get(`/produtos`)
  }

  const store = async (data: TProduto) => {
    return await api.post(`/produto`, data)
  }

  const update = async (id: number, data: TProduto) => {
    return await api.put(`/produto/${id}`, data)
  }

  const deleteProduto = async (id: number) => {
    return await api.delete(`/produto/${id}`)
  }

  return { getAll, store, update, deleteProduto }
}

export default useProdutoService
