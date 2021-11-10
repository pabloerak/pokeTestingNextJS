import Link from 'next/link'
import { useEffect, useState } from 'react'

const Pokemon = ({ pokemon }) => {
    //filter eliminara los huecos finales del array (URL de pokemones)
    //nos interesa el ID que esta en la ultima posicion del array (pop())
    const id = pokemon.url.split('/').filter(x => x).pop()
    return (
        <li data-testid={id}><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
    )
}

//NEXT renderiza un HTML en primera intancia para aumentar la velocidad
export default function Pokemones() {
    const [loading, setLoading] = useState(true)
    const [pokemones, setPokemones] = useState([])

    useEffect(()=> {
        const getPokemones = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            const data = await response.json()
            setPokemones(data.results)
            setLoading(false)
        }
        getPokemones()
    }, [])//array vacio = no recibirá ninguna dependencia
    if(loading) {
        return (
            <p>Cargando...</p>
        )
    }
    return (
        <div>
            <p data-testid='titulo'>Mi App de Pokemones</p>
            <ul>
                {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
            </ul>
        </div>

    )
}
