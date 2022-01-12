export type ErrorPayloadMessage = {
  message: string
  extensions: {
    contentful: {
      code: string
      requestId: string
      details: {
        maximumCost: number
        cost: number
      }
    }
  }
}

export type ErrorPayload = {
  errors: ErrorPayloadMessage[]
}

export type CategoryType = {
  engName: string
  czName: string
  linkedFrom: {
    articleCollection: {
      items: ArticleType[]
    }
  }
}

export type ArticleType = {
  engTitle: string
  czTitle: string
}
