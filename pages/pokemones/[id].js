import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()

    return(
        <div>
            <h1>{data.name} número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Volver al inicio</Link>
        </div>
    )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()
    return { props: { data } }
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1'} },
        { params: { id: '2'} },

    ]
    return{
        paths,
        fallback: 'blocking', 
     //PROPIEDAD FALLBACK:
     // FALSE: cuando tengamos prerendirizadas todas las rutas (si no hay muchas)
     // si es false solo se generaran los html de los paths en getStaticPaths
     // TRUE: habría que capturar: if (isFallback) {<p>Cargando...</ p>}
     // 'blocking': solo deveolver el HTML una vez haya sido generado por NEXT
    }
    
}

/*export const getServerSideProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()
    return { props: { data } }
}*/