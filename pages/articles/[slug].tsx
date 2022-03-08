import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { getArticlePageSingle } from "../../lib/contentful/pages/article";
import { getArticlePathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArticleType, Asset } from "../../types/shared";

interface ArticleProps {
  article: ArticleType;
  media: Asset[];
}

export default function Article({ article, media }: ArticleProps) {
  const { title, content, artistsCollection } = article;

  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-screen overflow-scroll p-8 pt-16 border-r border-black">
          <article className="max-w-xl mx-auto">
            <h1 className="text-xl mb-4">{title.toUpperCase()}</h1>
            <div className="mb-4">
              {artistsCollection.items.map(({ name, slug }, idx) => (
                <Link key={idx} href={`/artists/${slug}`} passHref>
                  <p className="cursor-pointer font-bold">{name}</p>
                </Link>
              ))}
            </div>
            <div className="rich-text mb-20">
              {content && renderRichTextWithImages(content)}
            </div>
          </article>
        </div>
        <div className="w-1/2 h-screen overflow-scroll bg-white">
          {media.map(({ url, width, height, contentType }, idx) => {
            if (contentType.includes("video")) {
              return <video className="w-full" key={idx} src={url} controls />;
            }
            if (contentType.includes("image")) {
              return (
                <div key={idx} className="relative">
                  <Image
                    src={url}
                    alt={title}
                    layout="responsive"
                    width={width}
                    height={height}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getArticlePathsToPreRender();

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ locale, params }: any) {
  const { article, media } = await getArticlePageSingle(params.slug, locale);

  return {
    props: {
      article,
      media,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 60,
  };
}
