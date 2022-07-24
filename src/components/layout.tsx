import { NextPage } from 'next'
import { ReactElement } from 'react'
import Header from './header'

interface LayoutProps {
  children: ReactElement
}

const Layout: NextPage<LayoutProps> = (props) => (
  <div>
    <Header />

    <div>
      <main>{props.children}</main>
    </div>
  </div>
)

export default Layout
