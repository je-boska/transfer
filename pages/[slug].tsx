import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getArticlePageSingle } from "../lib/contentful/pages/article";
import { getArticlePathsToPreRender } from "../lib/contentful/paths";
import { renderRichTextWithImages } from "../lib/rich-text";
import { ArticleType } from "../types/shared";

interface ArticleProps {
  article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
  const { title, content, artistsCollection } = article;
  return (
    <>
      <div className="container p-8">
        <h1 className="text-3xl mb-4">{title}</h1>
        <div className="mb-4">
          {artistsCollection.items.map(({ name, slug }, idx) => (
            <Link key={idx} href={`/artists/${slug}`} passHref>
              <p className="cursor-pointer">{name}</p>
            </Link>
          ))}
        </div>
        <div className="rich-text mb-20">
          {content && renderRichTextWithImages(content)}
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
  const article = await getArticlePageSingle(params.slug, locale);

  return {
    props: { article, ...(await serverSideTranslations(locale, ["common"])) },
    revalidate: 60 * 60,
  };
}
