interface CollectionResponse {
  data: {
    [key: string]: {
      items: any[];
    };
  };
}
export const extractCollection = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T[] => fetchResponse?.data?.[key]?.items;

export const extractCollectionItem = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T => fetchResponse?.data?.[key]?.items?.[0];

export const parseLocaleName = (locale: string) => {
  if (locale === "en") {
    return "en-US";
  } else if (locale === "cz") {
    return "cs";
  }
};
