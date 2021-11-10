import Link from 'next/link'

const Pokemon = ({ pokemon }) => {
  //filter eliminara los huecos finales del array (URL de pokemones)
  //nos interesa el ID que esta en la ultima posicion del array (pop())
  const id = pokemon.url.split('/').filter(x=> x).pop()
  return (
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  )
}

//NEXT renderiza un HTML en primera intancia para aumentar la velocidad
export default function Pokemones({ pokemones }) {
  return (
    <div>
      <p>Mi App de Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
    
  )
}

export const getStaticProps = async () => { //permite indicar a NEXT que esta pagina será estática (SSG: Static Site Generator)
                                            // cuando ejecutemos el comando run build
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
    props: { pokemones: data.results }
  }

}
