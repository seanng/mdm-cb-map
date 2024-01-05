import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {
  PREVIEWABLE_DOCUMENT_TYPES,
  schemaTypes,
  singletonPages,
} from 'schemas'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from 'libs/sanity.api'
import { previewDocumentNode } from 'plugins/previewPane'
import { productionUrl } from 'plugins/productionUrl'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  basePath: '/studio',
  name: 'mdm_cb-map_content_studio',
  title: 'mdm cb-map studio',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: pageStructure(singletonPages),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin(singletonPages.map((page) => page.name)),
    visionTool(),
    media(),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
