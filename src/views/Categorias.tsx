'use client'

import { useCallback, useEffect, useState } from 'react'

import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { toast } from 'react-toastify'

import AddIcon from '@mui/icons-material/Add'

import useCategoriaService from '@/services/categoriaService'
import type { TCategoria } from '@/types/categoria'
import Table from '@/components/Table'
import CategoriaProdutoDialog from '@/components/dialogs/CategoriaProdutoDialog'

const Categorias = () => {
  const { getAll, deleteCategoria } = useCategoriaService()

  const [showModal, setShowModal] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<TCategoria | null>(null)
  const [data, setData] = useState([])

  const tableColumns = [
    {
      key: 'id_categoria_planejamento',
      label: 'Código',
      maxWidth: '8%'
    },
    {
      key: 'nome_categoria',
      label: 'Nome'
    },
    {
      key: 'actions',
      label: 'Ações',
      maxWidth: '13%',
      render: (_: any, row: any) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton onClick={e => handleEdit(e, row)}>
              <CreateIcon />
            </IconButton>
            <IconButton onClick={e => handleDelete(e, row)}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        </>
      )
    }
  ]

  const fetchData = useCallback(() => {
    getAll()
      .then(resp => setData(resp.data.data))
      .catch(error => {
        toast.error(error.response.data.message)
        console.error('Error fetching data:', error)
      })
  }, [getAll])

  const handleDelete = (event: any, row: TCategoria) => {
    event.stopPropagation()

    deleteCategoria(row.id_categoria_planejamento)
      .then(() => {
        toast.success(`Categoria ${row.nome_categoria} deletada com sucesso!`)
        fetchData()
      })
      .catch(error => {
        toast.error(error.response.data.message)
        console.log('error', error)
      })
  }

  const handleEdit = (event: any, row: TCategoria) => {
    event.stopPropagation()

    setSelectedCategoria(row)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setTimeout(() => {
      setSelectedCategoria(null)
      fetchData()
    }, 300)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='h3' color='var(--primary-color)'>
              Categorias
            </Typography>

            <Button
              variant='contained'
              startIcon={<AddIcon sx={{ fontSize: '20px' }} />}
              onClick={() => setShowModal(true)}
            >
              Categoria
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Table columns={tableColumns} data={data} noResults={'Nenhuma categoria encontrada.'} />
        </Grid>
      </Grid>

      <CategoriaProdutoDialog open={showModal} handleClose={handleCloseModal} categoria={selectedCategoria} />
    </>
  )
}

export default Categorias
