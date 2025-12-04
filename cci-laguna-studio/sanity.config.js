import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'cci-laguna-studio',

  projectId: 'y3oueh1l',
  dataset: 'production',

  plugins: [structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Contenido')
          .items([
            // Agregamos el ítem especial para ordenar Aliados
            orderableDocumentListDeskItem({type: 'ally', title: 'Red de Adherentes', S, context}),
            
            // Mostramos el resto de los tipos (excluyendo 'ally' para no duplicarlo)
            ...S.documentTypeListItems().filter(item => item.getId() !== 'ally')
          ])
      },
    }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
