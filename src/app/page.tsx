import { Typography } from '@mui/material'

import Layout from './(blank-layout-pages)/layout'

export default function Home() {
  return (
    <>
      <Layout>
        <Typography variant='h3' color='var(--primary-color)'>
          Bem vindo ao sistema!
        </Typography>
      </Layout>
    </>
  )
}
