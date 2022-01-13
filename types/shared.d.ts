import { Document } from '@contentful/rich-text-types'

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
  slug: string
  content: Content
  categoryCollection: {
    items: CategoryType[]
  }
}

export interface Asset {
  sys: { id: string }
  contentType: string
  title: string
  description: string
  url: string
  width: number
  height: number
}

export interface Content {
  json: Document
  links?: Links
}
