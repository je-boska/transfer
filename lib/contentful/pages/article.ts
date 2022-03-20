import { graphql } from '..';
import { ArticleType } from '../../../types/shared';
import { extractCollectionItem, parseLocaleName } from '../../../util';

export async function getArticlePageSingle(slug: string, locale: string) {
  const parsedLocale = parseLocaleName(locale);

  const ArticlePageSingleQuery = /* GraphQL */ `
    query ArticlePageSingleQuery($slug: String, $locale: String) {
      articleCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
        items {
          title
          slug
          videoLink
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
          mediaCollection {
            items {
              sys {
                id
              }
              title
              description
              url
              width
              height
              contentType
            }
          }
          categoriesCollection {
            items {
              name
              description
            }
          }
          artistsCollection {
            items {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const data = await graphql(ArticlePageSingleQuery, {
    variables: { slug, locale: parsedLocale },
  });

  return {
    article: extractCollectionItem<ArticleType>(data, 'articleCollection'),
  };
}
