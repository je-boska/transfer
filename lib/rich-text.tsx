import Image from 'next/image'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Block, Inline, BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Asset, Content } from '../types/shared'

const getAssetById = (id: string, assets: Asset[]) =>
  assets.filter(asset => asset.sys.id === id).pop()

export function renderRichTextWithImages(content: Content) {
  if (content.links) {
    const blockAssets = content.links.assets.block

    return documentToReactComponents(content.json, {
      renderNode: {
        [INLINES.HYPERLINK]: function InlineHyperlink(
          node: Block | Inline,
          children
        ) {
          const uri = node.data.uri as string

          return <a href={uri}>{children}</a>
        },
        [BLOCKS.EMBEDDED_ASSET]: function EmbeddedAsset(node: Block | Inline) {
          const id = node.data.target.sys.id

          const asset = getAssetById(id, blockAssets)

          if (asset?.contentType.includes('image')) {
            return (
              <div className='mb-6'>
                <Image
                  src={asset.url}
                  alt={asset.title}
                  width={asset.width}
                  height={asset.height}
                  layout='responsive'
                />
              </div>
            )
          }

          if (asset?.contentType.includes('video')) {
            return <video src={asset.url} autoPlay muted loop />
          }

          return null
        },
      },
    })
  }

  return documentToReactComponents(content.json)
}
