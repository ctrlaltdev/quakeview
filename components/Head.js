import Head from 'next/head'

const MainHead = ({ title }) => (
    <Head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Quake View" />
        <meta property="og:description" content="Yorick Demichelis" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quake.ctrlalt.dev/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#222222" />
        <link rel="manifest" href="https://quake.ctrlalt.dev/static/manifest.json" />
        <link rel="shortcut icon" href="https://quake.ctrlalt.dev/static/favicon.png" />
        <title>Quake View - { title }</title>
    </Head>
)

export default MainHead