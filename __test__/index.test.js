import Index, { getStaticProps } from '../pages/index'
import { render, screen } from '@testing-library/react'
//render se utiliza para un elemento y screen para todo
describe('Index', () => {

    describe('Component', () => {
        it('se renderiza', () => {
            render( //nos dirá si renderiza correctamente
                <Index pokemones={[{ name: 'Chanchito feliz', url: '/pokemon/detalle/1' }]}/>
            )

            //const paragraph = screen.getByText('Mi App de Pokemones')
            const paragraph = screen.getByTestId('titulo')
            expect(paragraph).toBeInTheDocument()
        
            //De esta forma podemos comprobar elementos que tienen nuestros componenetes
                const pokechanchito = screen.getByText('Chanchito feliz')
                //console.log(pokechanchito.getAttribute('href'))
                expect(pokechanchito).toBeInTheDocument()
                const url = pokechanchito.getAttribute('href')
                expect(url).toEqual('/pokemones/1')
        })
    })
    describe('getStaticProps', () => {
        it('return pokemones', async () => {
            global.fetch = jest.fn()
            .mockImplementation(url => {
                //console.log(url)
                expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=151')
                return new Promise(resolve => { //esta nueva Promesa = response
                    resolve({ 
                        json: () => Promise.resolve({ //esto es data
                            results: 'lista de pokemones'
                        })
                    })
                })
            })
            const { props } = await getStaticProps()
            expect(props.pokemones).toBe('lista de pokemones')
        })
    })
})