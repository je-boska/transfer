import { graphql } from '.'
import { extractCollection } from '../../util'

export async function getArticlePathsToPreRender() {
  const data = await graphql(/* GraphQL */ `
    query ArticlePathsToPreRenderQuery {
      articleCollection(where: { slug_exists: true }, limit: 100) {
        items {
          slug
        }
      }
    }
  `)

  const collection = extractCollection<{ slug: string }>(
    data,
    'articleCollection'
  )

  const paths = collection.map(el => ({
    params: { slug: el.slug },
  }))

  return paths
}
