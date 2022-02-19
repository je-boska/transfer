import { graphql } from "..";
import { ArtistType } from "../../../types/shared";
import { extractCollectionItem, parseLocaleName } from "../../../util";

export async function getArtistPageSingle(slug: string, locale: string) {
  const parsedLocale = parseLocaleName(locale);
  const ArtistPageSingleQuery = /* GraphQL */ `
    query ArtistPageSingleQuery($slug: String, $locale: String) {
      artistCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
        items {
          name
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
        }
      }
    }
  `;
  const data = await graphql(ArtistPageSingleQuery, {
    variables: { slug, locale: parsedLocale },
  });

  return extractCollectionItem<ArtistType>(data, "artistCollection");
}
