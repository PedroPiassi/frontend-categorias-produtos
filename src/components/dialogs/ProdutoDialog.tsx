import { useEffect, useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { Autocomplete, Button, Grid, TextField } from '@mui/material'

import moment from 'moment'

import { formikProps } from '@/utils/formikProps'
import BasicDialog from './BasicDialog'
import useProdutoService from '@/services/produtoService'
import type { TProduto } from '@/types/produto'
import useCategoriaService from '@/services/categoriaService'
import { defValueCategoria, type TCategoria } from '@/types/categoria'

const getValidationSchema = () => {
  return Yup.object().shape({
    nome_produto: Yup.string().required('Campo obrigatório'),
    valor_produto: Yup.number().required('Campo obrigatório'),
    id_categoria_produto: Yup.string().required('Campo obrigatório')
  })
}

export default function ProdutoDialog({ open, handleClose, produto }: ProdutoDialogProps) {
  const { store, update } = useProdutoService()
  const { getAll } = useCategoriaService()

  const [categorias, setCategorias] = useState<TCategoria[]>([])

  const formik = useFormik<TProduto>({
    initialValues: {
      id_produto: produto ? produto.id_produto : 0,
      id_categoria_produto: produto ? produto.id_categoria_produto : 0,
      data_cadastro: produto ? produto.data_cadastro : '',
      nome_produto: produto ? produto.nome_produto : '',
      valor_produto: produto ? produto.valor_produto : ''
    },
    validationSchema: getValidationSchema(),
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  const handleSubmit = (values: TProduto) => {
    if (produto) {
      update(produto.id_produto, values)
        .then(() => {
          toast.success('Produto atualizado com sucesso!')
          handleCloseClear()
        })
        .catch(error => {
          toast.error(error.response.data.message)
          console.log('error', error)
        })
    } else {
      store({
        ...values,
        data_cadastro: moment().format('YYYY-MM-DD')
      })
        .then(() => {
          toast.success('Produto cadastrado com sucesso!')
          handleCloseClear()
        })
        .catch(error => {
          toast.error('Erro ao cadastrar Produto!')
          console.log('error', error)
        })
    }
  }

  const handleDataCategorias = () => {
    getAll()
      .then(resp => {
        console.log(resp.data.data)

        setCategorias(resp.data.data)
      })
      .catch(error => {
        toast.error('Erro ao carregar categorias')
        console.log('error', error)
      })
  }

  const handleCategoriaChange = (_: any, value: TCategoria | null) => {
    formik.setFieldValue('id_categoria_produto', value ? value.id_categoria_planejamento : null)

    if (value) {
      setCategorias([value])
    } else {
      setCategorias([])
    }
  }

  const handleCloseClear = () => {
    handleClose()
    setTimeout(() => {
      formik.resetForm()
    }, 300)
  }

  useEffect(() => {
    handleDataCategorias()

    if (produto) {
      formik.setFieldValue('id_produto', produto.id_produto)
      formik.setFieldValue('id_categoria_produto', produto.id_categoria_produto)
      formik.setFieldValue('data_cadastro', produto.data_cadastro)
      formik.setFieldValue('nome_produto', produto.nome_produto)
      formik.setFieldValue('valor_produto', produto.valor_produto)
    } else {
      formik.resetForm()
    }
  }, [produto])

  return (
    <>
      <BasicDialog
        open={open}
        handleClose={handleCloseClear}
        title={produto ? 'Alteração de Produto' : 'Cadastro de Produto'}
        maxWidth='md'
        mdSize='40%'
        withActions={
          <>
            <Button variant={'outlined'} onClick={handleCloseClear}>
              <b>Cancelar</b>
            </Button>
            <Button variant={'contained'} onClick={formik.submitForm}>
              <b>{produto ? 'Atualizar' : 'Cadastrar'}</b>
            </Button>
          </>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <div>
                <TextField
                  {...formikProps('nome_produto', formik)}
                  name='nome_produto'
                  label='Nome'
                  fullWidth
                  type='text'
                  size='small'
                  required
                />
              </div>
            </Grid>

            <Grid item md={6}>
              <TextField
                {...formikProps('valor_produto', formik)}
                name='Valor'
                label='Valor'
                fullWidth
                type='number'
                size={'small'}
                required
              />
            </Grid>

            <Grid item md={6}>
              <Autocomplete
                aria-label='Categoria'
                options={categorias}
                getOptionLabel={option => option.nome_categoria}
                onChange={handleCategoriaChange}
                value={
                  categorias.find(
                    categoria => categoria.id_categoria_planejamento === formik.values.id_categoria_produto
                  ) || defValueCategoria
                }
                disableClearable
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    size='small'
                    required
                    label='Categoria'
                    error={formik.touched.id_categoria_produto && !!formik.errors.id_categoria_produto}
                    helperText={formik.touched.id_categoria_produto && formik.errors.id_categoria_produto}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </BasicDialog>
    </>
  )
}

interface ProdutoDialogProps {
  open: boolean
  handleClose: () => void
  produto?: TProduto | null
}
