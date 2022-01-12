import { graphql } from '..'
import { CategoryType } from '../../../types/shared'
import { extractCollection } from '../../../util'

export async function getHomePage() {
  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery {
      categoryCollection {
        items {
          engName
          czName
          linkedFrom {
            articleCollection {
              items {
                engTitle
                czTitle
              }
            }
          }
        }
      }
    }
  `

  const data = await graphql(HomePageQuery)

  return extractCollection<CategoryType>(data, 'categoryCollection')
}
