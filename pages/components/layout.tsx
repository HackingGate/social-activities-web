import styles from '../../styles/Layout.module.css'
import { NextPage } from 'next';
import { ReactElement } from 'react';
import Footer from './footer';
import Header from './header';

interface LayoutProps {
  children: ReactElement,
}

const Layout: NextPage<LayoutProps> = (props) => (
  <div className={styles.container}>
    <Header/>

    <main className={styles.main}>
      {props.children}
    </main>

    <Footer/>
  </div>
)

export default Layout
