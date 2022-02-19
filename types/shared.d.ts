import { Document } from "@contentful/rich-text-types";

export type ErrorPayloadMessage = {
  message: string;
  extensions: {
    contentful: {
      code: string;
      requestId: string;
      details: {
        maximumCost: number;
        cost: number;
      };
    };
  };
};

export type ErrorPayload = {
  errors: ErrorPayloadMessage[];
};

export type CategoryType = {
  name: string;
  description: string;
  linkedFrom: {
    articleCollection: {
      items: ArticleType[];
    };
    artistCollection: {
      items: ArtistType[];
    };
  };
};

export type ArticleType = {
  title: string;
  slug: string;
  content: Content;
  categoryCollection: {
    items: CategoryType[];
  };
};

export type ArtistType = {
  name: string;
  slug: string;
  bio: Content;
};

export interface Asset {
  sys: { id: string };
  contentType: string;
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

export interface Content {
  json: Document;
  links?: Links;
}
