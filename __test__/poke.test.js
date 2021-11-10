import { render, screen, waitFor } from '@testing-library/react'
import Poke from '../pages/poke'


describe('Poke', () => { //asi le decimos que vamos a testear la pagina de Poke
    it('renders pokemones', async () =>  {
        //como hay una llamada a la API (fetch) necesitamos un Mock
        const mockResults = [{ name: 'chanchito', url: 'https://www.dominio.com/pokemones/1' }]
        global.fetch = jest.fn()
            .mockImplementation(url => {
                return new Promise(resolve => {
                    resolve({
                        json: () => Promise.resolve({
                            results: mockResults
                        })
                    })
                })
            })
        render(
            <Poke />
        )
        const loading = screen.getByText('Cargando...')
        expect(loading).toBeInTheDocument()
        await waitFor(() => screen.getByText('Mi App de Pokemones'))
        const element = screen.getByTestId(1)//sabemos que sera el primer elemento li
        const anchor = element.children[0]//queremos obtener su hijo (Link)
        expect(anchor).toHaveAttribute('href', '/pokemones/1')
        expect(anchor).toHaveTextContent('chanchito')
    })
})