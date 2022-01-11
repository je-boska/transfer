import { graphql } from '..'
import { CategoryEntry } from '../../../types/shared'
import { extractCollection } from '../../../util'

export async function getHomePage() {
  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery {
      categoryCollection {
        items {
          engName
          czName
        }
      }
    }
  `

  const data = await graphql(HomePageQuery)

  return extractCollection<CategoryEntry>(data, 'categoryCollection')
}
