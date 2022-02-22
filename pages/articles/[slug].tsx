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
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <div className="mb-4">
            {artistsCollection.items.map(({ name, slug }, idx) => (
              <Link key={idx} href={`/artists/${slug}`} passHref>
                <p className="cursor-pointer font-bold">{name}</p>
              </Link>
            ))}
          </div>
          <div className="rich-text max-w-xl mb-20">
            {content && renderRichTextWithImages(content)}
          </div>
        </div>
        <div className="w-1/2 h-screen overflow-scroll bg-white">
          {media.map(({ url, width, height }, idx) => (
            <div key={idx} className="relative p-16">
              <Image
                src={url}
                alt={title}
                layout="intrinsic"
                objectFit="contain"
                width={width}
                height={height}
              />
            </div>
          ))}
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
