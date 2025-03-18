import type { TCategoria } from './categoria'

export type TProduto = {
  id_produto: number
  id_categoria_produto: number
  data_cadastro: string
  nome_produto: string
  valor_produto: string
  categoria?: TCategoria
}
