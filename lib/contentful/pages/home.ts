import { graphql } from "..";
import { CategoryType } from "../../../types/shared";
import { extractCollection, parseLocaleName } from "../../../util";

export async function getHomePage(locale) {
  const parsedLocale = parseLocaleName(locale);

  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery($locale: String) {
      categoryCollection(locale: $locale, limit: 50) {
        items {
          name
          description
          linkedFrom {
            articleCollection {
              items {
                title
                slug
              }
            }
            artistCollection {
              items {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;
  const data = await graphql(HomePageQuery, {
    variables: { locale: parsedLocale },
  });

  return extractCollection<CategoryType>(data, "categoryCollection");
}
