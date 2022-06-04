import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{padding: "5rem"}}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
