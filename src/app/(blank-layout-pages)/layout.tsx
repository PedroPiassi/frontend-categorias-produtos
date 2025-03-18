import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import LayoutWrapper from '@/@layouts/LayoutWrapper'
import VerticalLayout from '@/@layouts/VerticalLayout'
import Navigation from '@/components/layout/vertical/Navigation'
import Navbar from '@/@layouts/components/vertical/Navbar'

const Layout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
