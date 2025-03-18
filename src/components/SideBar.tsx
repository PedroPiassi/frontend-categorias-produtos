'use client'

import { List, ListItem, Drawer, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'

import Link from './Link'

interface MenuItemsAdmProps {
  id: number
  label: string
  icon: React.ReactNode
  path: string
}

const menuItemsAdm: MenuItemsAdmProps[] = [
  {
    id: 1,
    label: 'Produtos',
    icon: <ProductionQuantityLimitsIcon />,
    path: '/unidades'
  },
  {
    id: 2,
    label: 'Categorias',
    icon: <CategoryIcon />,
    path: '/servicos'
  }
]

const SideBar = () => {
  return (
    <>
      <Drawer
        variant='permanent'
        open
        sx={{
          width: 180,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box'
          }
        }}
      >
        <div>
          <List>
            {menuItemsAdm.map(menuItem => (
              <ListItem button key={menuItem.id}>
                <Link href={menuItem.path} passHref>
                  <a style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    {menuItem.icon}
                    <Typography
                      variant='h6'
                      sx={{ marginLeft: '10px', color: 'text.primary' }}
                    >
                      {menuItem.label}
                    </Typography>
                  </a>
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default SideBar
