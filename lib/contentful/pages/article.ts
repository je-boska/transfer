import { graphql } from '..';
import { ArticleType, Asset } from '../../../types/shared';
import { extractCollectionItem, parseLocaleName } from '../../../util';

export async function getArticlePageSingle(slug: string, locale: string) {
  const parsedLocale = parseLocaleName(locale);

  const ArticlePageSingleQuery = /* GraphQL */ `
    query ArticlePageSingleQuery($slug: String, $locale: String) {
      articleCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
        items {
          title
          slug
          videoLinks
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
      media: articleCollection(
        where: { slug: $slug }
        limit: 1
        locale: "en-US"
      ) {
        items {
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
        }
      }
    }
  `;
  const data = await graphql(ArticlePageSingleQuery, {
    variables: { slug, locale: parsedLocale },
  });

  return {
    article: extractCollectionItem<ArticleType>(data, 'articleCollection'),
    media: extractCollectionItem<ArticleType>(data, 'media').mediaCollection
      .items,
  };
}
