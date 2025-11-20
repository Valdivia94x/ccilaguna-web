import { createClient } from '@sanity/client'
import { createReadStream, readdirSync } from 'fs'
import { basename, extname, join } from 'path'

const PROJECT_ID = 'y3oueh1l' // Lo sacas de sanity.config.js o manage.sanity.io
const TOKEN = 'skgQxDh1cKmqykcC7pIVYLy59hFfW2ycw0JFkoMVj02RzsWU2mWxLaGBMll93jFh0A4Zx1r7klambX8ouajUlbku1OJU6ZLUnx4DaWyACfAdwyIxkH3gozfU1AS7KcdBUXC7jasrZKxTYW4iK2D0Vi8SCueVbC4XnM822HXo7QdAvwB66RLl'
const FOLDER_PATH = 'D:/Asus/DescargasD/01NoFontLogos/faltantes'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

async function uploadLogos() {
  try {
    // Leemos los archivos y filtramos solo imágenes
    const files = readdirSync(FOLDER_PATH).filter(file => 
      file.match(/\.(jpg|jpeg|png|svg)$/i)
    )

    // Los ordenamos alfabéticamente (01_, 02_...) para subirlos en orden
    files.sort()

    console.log(`🚀 Encontrados ${files.length} logos. Iniciando carga...`)

    for (const file of files) {
      const filePath = join(FOLDER_PATH, file)
      
      // Limpiamos el nombre: quitamos "01_" al inicio y la extensión
      // Ejemplo: "01_Coca Cola.png" -> "Coca Cola"
      let cleanName = basename(file, extname(file)).replace(/^\d+[\s_]*/, '')

      // Capitalizamos la primera letra (opcional, se ve mejor)
      cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

      console.log(`Subiendo: ${cleanName}...`)

      // 1. Subimos la imagen a Sanity
      const imageAsset = await client.assets.upload('image', createReadStream(filePath), {
        filename: file
      })

      // 2. Creamos el documento "Aliado"
      await client.create({
        _type: 'ally', // Debe coincidir con el name: 'ally' de tu schema
        name: cleanName,
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
    }

    console.log('✅ ¡ÉXITO! Todos los logos se subieron correctamente.')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('Revisa que la ruta de la carpeta sea correcta y use barras /')
  }
}

uploadLogos()