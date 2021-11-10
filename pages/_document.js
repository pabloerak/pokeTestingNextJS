import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet() //permite crear una hoja de estilo pero del lado del servidor
        const originalRenderPage = ctx.renderPage
        
        try {
            ctx.renderPage = () => //reemplazamos renderPage
            originalRenderPage({
                enhanceApp: App => props => //permite pasarle mas propiedades y comportamiento al renderizado
                    sheet.collectStyles(<App {...props} />), //busca todos los estilos de nuestra App
            })

            const initialProps = await Document.getInitialProps(ctx)

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    } 
}

//es necesario crear el archivo .babelrc e instalar las dependencias con npm i -D babel-plugin-styled-components