import { Document } from '@contentful/rich-text-types';

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
  slug: string;
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
  categoriesCollection: {
    items: CategoryType[];
  };
  artistsCollection: {
    items: ArtistType[];
  };
  mediaCollection: {
    items: Asset[];
  };
  videoLinks?: string[];
};

export type ArtistType = {
  name: string;
  slug: string;
  bio: Content;
  image: Asset;
  linkedFrom: {
    articleCollection: {
      items: ArticleType[];
    };
  };
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
