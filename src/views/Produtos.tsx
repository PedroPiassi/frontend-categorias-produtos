'use client'

import { useCallback, useEffect, useState } from 'react'

import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { toast } from 'react-toastify'

import AddIcon from '@mui/icons-material/Add'

import moment from 'moment'

import Table from '@/components/Table'
import useProdutoService from '@/services/produtoService'
import type { TProduto } from '@/types/produto'
import ProdutoDialog from '@/components/dialogs/ProdutoDialog'

const Produtos = () => {
  const { getAll, deleteProduto } = useProdutoService()

  const [showModal, setShowModal] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState<TProduto | null>(null)
  const [data, setData] = useState([])

  const tableColumns = [
    {
      key: 'id_produto',
      label: 'Código',
      maxWidth: '8%'
    },
    {
      key: 'nome_produto',
      label: 'Nome Produto'
    },
    {
      key: 'valor_produto',
      label: 'valor_produto',
      render: (value: any) => {
        return `R$: ${value}`
      }
    },
    {
      key: 'categoria',
      label: 'Categoria',
      render: (value: any) => {
        return value?.nome_categoria
      }
    },
    {
      key: 'data_cadastro',
      label: 'Data Cadastro',
      maxWidth: '10%',
      render: (value: any) => {
        return moment(value?.data_cadastro).format('DD/MM/YYYY')
      }
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

  const handleDelete = (event: any, row: TProduto) => {
    event.stopPropagation()

    deleteProduto(row.id_produto)
      .then(() => {
        toast.success(`Produto ${row.nome_produto} deletado com sucesso!`)
        fetchData()
      })
      .catch(error => {
        toast.error(error.response.data.message)
        console.log('error', error)
      })
  }

  const handleEdit = (event: any, row: TProduto) => {
    event.stopPropagation()

    setSelectedProduto(row)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setTimeout(() => {
      setSelectedProduto(null)
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
              Produtos
            </Typography>

            <Button
              variant='contained'
              startIcon={<AddIcon sx={{ fontSize: '20px' }} />}
              onClick={() => setShowModal(true)}
            >
              Produto
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Table columns={tableColumns} data={data} noResults={'Nenhuma categoria encontrada.'} />
        </Grid>
      </Grid>

      <ProdutoDialog open={showModal} handleClose={handleCloseModal} produto={selectedProduto} />
    </>
  )
}

export default Produtos
