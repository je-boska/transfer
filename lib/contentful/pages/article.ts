import { graphql } from '..'
import { ArticleType } from '../../../types/shared'
import { extractCollectionItem } from '../../../util'

export async function getArticlePageSingle(slug: string, locale: string) {
  if (locale === 'en') {
    locale = 'en-US'
  } else if (locale === 'cz') {
    locale = 'cs'
  }
  const ArticlePageSingleQuery = /* GraphQL */ `
    query ArticlePageSingleQuery($slug: String, $locale: String) {
      articleCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
        items {
          title
          slug
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  contentType
                  title
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          categoriesCollection {
            items {
              name
            }
          }
        }
      }
    }
  `
  const data = await graphql(ArticlePageSingleQuery, {
    variables: { slug, locale },
  })

  return extractCollectionItem<ArticleType>(data, 'articleCollection')
}
