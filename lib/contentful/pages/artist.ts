import { graphql } from '..';
import { ArtistType, Asset } from '../../../types/shared';
import { extractCollectionItem, parseLocaleName } from '../../../util';

export async function getArtistPageSingle(slug: string, locale: string) {
  const parsedLocale = parseLocaleName(locale);
  const ArtistPageSingleQuery = /* GraphQL */ `
    query ArtistPageSingleQuery($slug: String, $locale: String) {
      artistCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
        items {
          name
          image {
            sys {
              id
            }
            title
            description
            url
            width
            height
          }
          bio {
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
          linkedFrom {
            articleCollection {
              items {
                title
                slug
              }
            }
          }
        }
      }
    }
  `;
  const data = await graphql(ArtistPageSingleQuery, {
    variables: { slug, locale: parsedLocale },
  });

  return {
    artist: extractCollectionItem<ArtistType>(data, 'artistCollection'),
  };
}
