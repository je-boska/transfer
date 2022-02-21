import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getArtistPageSingle } from "../../lib/contentful/pages/artist";
import { getArtistPathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArtistType } from "../../types/shared";

interface ArtistProps {
  artist: ArtistType;
}

export default function Artist({ artist }: ArtistProps) {
  return (
    <div className="container p-8">
      <div className="text-3xl mb-4">{artist.name}</div>
      {artist.bio && (
        <div className="rich-text mb-20">
          {renderRichTextWithImages(artist.bio)}
        </div>
      )}
      {artist.linkedFrom.articleCollection.items.map(({ title, slug }, idx) => (
        <Link key={idx} href={`/articles/${slug}`} passHref>
          <div className="cursor-pointer">
            <h2>{title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getArtistPathsToPreRender();

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ locale, params }: any) {
  const artist = await getArtistPageSingle(params.slug, locale);

  return {
    props: { artist, ...(await serverSideTranslations(locale, ["common"])) },
    revalidate: 60 * 60,
  };
}
