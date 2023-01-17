import styles from '../styles/styles.css'
import { AppWrapper } from '../components/context/context.js'

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
        <Component {...pageProps} />
    </AppWrapper>
  )
}
