import { graphql } from '..'
import { CategoryType } from '../../../types/shared'
import { extractCollection } from '../../../util'

export async function getHomePage(locale) {
  if (locale === 'en') {
    locale = 'en-US'
  } else if (locale === 'cz') {
    locale = 'cs'
  }

  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery($locale: String) {
      categoryCollection(locale: $locale) {
        items {
          name
          linkedFrom {
            articleCollection {
              items {
                title
              }
            }
          }
        }
      }
    }
  `

  const data = await graphql(HomePageQuery, { variables: { locale } })

  return extractCollection<CategoryType>(data, 'categoryCollection')
}
