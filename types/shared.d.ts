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
  name: string
  linkedFrom: {
    articleCollection: {
      items: ArticleType[]
    }
  }
}

export type ArticleType = {
  title: string
}
