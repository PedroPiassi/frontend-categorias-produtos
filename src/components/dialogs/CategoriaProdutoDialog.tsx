import { useEffect } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button, Grid, TextField } from '@mui/material'

import { toast } from 'react-toastify'

import useCategoriaService from '@/services/categoriaService'
import type { TCategoria } from '@/types/categoria'
import { formikProps } from '@/utils/formikProps'
import BasicDialog from './BasicDialog'

const getValidationSchema = () => {
  return Yup.object().shape({
    nome_categoria: Yup.string().required('Campo obrigatório')
  })
}

export default function CategoriaProdutoDialog({ open, handleClose, categoria }: CategoriaProdutoDialogProps) {
  const { store, update } = useCategoriaService()

  const formik = useFormik({
    initialValues: {
      nome_categoria: categoria ? categoria.nome_categoria : ''
    },
    validationSchema: getValidationSchema(),
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  const handleSubmit = (values: any) => {
    if (categoria) {
      update(categoria.id_categoria_planejamento, values)
        .then(() => {
          toast.success('Categoria atualizada com sucesso!')
          handleCloseClear()
        })
        .catch(error => {
          toast.error(error.response.data.message)
          console.log('error', error)
        })
    } else {
      store(values)
        .then(() => {
          toast.success('Categoria cadastrada com sucesso!')
          handleCloseClear()
        })
        .catch(error => {
          toast.error(error.response.data.message)
          console.log('error', error)
        })
    }
  }

  const handleCloseClear = () => {
    handleClose()
    setTimeout(() => {
      formik.resetForm()
    }, 300)
  }

  useEffect(() => {
    if (categoria) {
      formik.setFieldValue('nome_categoria', categoria.nome_categoria)
    } else {
      formik.resetForm()
    }
  }, [categoria])

  return (
    <>
      <BasicDialog
        open={open}
        handleClose={handleCloseClear}
        title={categoria ? 'Alteração de Categoria' : 'Cadastro de Categoria'}
        maxWidth='md'
        mdSize='40%'
        withActions={
          <>
            <Button variant={'outlined'} onClick={handleCloseClear}>
              <b>Cancelar</b>
            </Button>
            <Button variant={'contained'} onClick={formik.submitForm}>
              <b>{categoria ? 'Atualizar' : 'Cadastrar'}</b>
            </Button>
          </>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <div>
                <TextField
                  {...formikProps('nome_categoria', formik)}
                  name='nome_categoria'
                  label='Nome'
                  fullWidth
                  type='text'
                  size='small'
                  required
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </BasicDialog>
    </>
  )
}

interface CategoriaProdutoDialogProps {
  open: boolean
  handleClose: () => void
  categoria: TCategoria | null
}
