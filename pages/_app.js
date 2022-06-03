import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{padding: "3rem"}}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
