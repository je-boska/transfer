export const extractCollection = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T[] => fetchResponse?.data?.[key]?.items

interface CollectionResponse {
  data: {
    [key: string]: {
      items: any[]
    }
  }
}
